import React, { Component } from 'react';
import {
    SafeAreaView, View, Text, ScrollView, FlatList,
    TouchableOpacity, TextInput, ImageBackground, Image, Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { transportstyle, MAP_SIZE } from '../../assets/styles/student_transport';
import { styles } from '../../assets/styles';
import { switchHomePageAction } from '../../navigations/rootNavigation';

const QUARTIERS = [
    { name: "Logbessou", xMin: 0, xMax: MAP_SIZE / 2, yMin: 0, yMax: MAP_SIZE / 2 },
    { name: "Logpom", xMin: MAP_SIZE / 2, xMax: MAP_SIZE, yMin: 0, yMax: MAP_SIZE / 2 },
    { name: "Bonamoussadi", xMin: 0, xMax: MAP_SIZE / 2, yMin: MAP_SIZE / 2, yMax: MAP_SIZE },
    { name: "Yassa", xMin: MAP_SIZE / 2, xMax: MAP_SIZE, yMin: MAP_SIZE / 2, yMax: MAP_SIZE },
];

class Student_Transport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenu: 'Itinerary',
            currentSubscription: null,
            showForm: false,
            subscriptionType: 'Mensuel',
            arretBus: '',
            liveBuses: [
                { id: 1, busNumber: "A-01", driver: "Dumérile", x: 50, y: 50, dx: 1.5, dy: 1.2, routeColor: "#1B497D", currentZone: "Plateau", speed: "45" },
                { id: 2, busNumber: "B-05", driver: "Yannick", x: 200, y: 80, dx: -1.2, dy: 1.8, routeColor: "#10B981", currentZone: "Médina", speed: "38" },
                { id: 3, busNumber: "C-12", driver: "Arielle", x: 100, y: 220, dx: 2.0, dy: -1.0, routeColor: "#f59e0b", currentZone: "Almadies", speed: "52" },
            ],
            vehicleAllocation: [
                { id: 1, bus: "A-01", driver: "Dumérile", route: "École → Plateau", students: 38, capacity: 50 },
                { id: 2, bus: "B-05", driver: "Yannick", route: "École → Médina", students: 42, capacity: 45 },
                { id: 3, bus: "C-12", driver: "Arielle", route: "École → Ouakam", students: 0, capacity: 48 },
            ],
        };
    }

    componentDidMount() {
        this.gpsInterval = setInterval(() => this.moveVehicles(), 50);
    }

    componentWillUnmount() {
        if (this.gpsInterval) clearInterval(this.gpsInterval);
    }

    _navigateToMenu = () => {
        switchHomePageAction(true);
    };

    getZoneName = (x, y) => {
        const zone = QUARTIERS.find(q => x >= q.xMin && x <= q.xMax && y >= q.yMin && y <= q.yMax);
        return zone ? zone.name : "Zone Inconnue";
    };

    moveVehicles = () => {
        this.setState(prev => {
            const updatedBuses = prev.liveBuses.map(bus => {
                let newX = bus.x + bus.dx;
                let newY = bus.y + bus.dy;
                let newDx = bus.dx;
                let newDy = bus.dy;

                if (newX <= 0 || newX >= MAP_SIZE - 25) newDx = -bus.dx;
                if (newY <= 0 || newY >= MAP_SIZE - 25) newDy = -bus.dy;
                if (Math.random() > 0.98) {
                    newDx = (Math.random() - 0.5) * 3;
                    newDy = (Math.random() - 0.5) * 3;
                }

                return { ...bus, x: newX, y: newY, dx: newDx, dy: newDy, currentZone: this.getZoneName(newX, newY) };
            });
            return { liveBuses: updatedBuses };
        });
    };

    handleSubscribe = (data) => {
        this.setState({
            currentSubscription: data,
            showForm: false,
        });
    };

    renderContent = (transportSubscription, transportBooking) => {
        const { activeMenu, liveBuses, vehicleAllocation, currentSubscription, showForm, subscriptionType, arretBus } = this.state;

        switch (activeMenu) {
            case 'Itinerary':
                return <ItinerarySection liveBuses={liveBuses} />;
            case 'Vehicle allocation':
                return <VehicleAllocationSection allocation={vehicleAllocation} />;
            // const allocation = transportBooking.length > 0
            //     ? transportBooking.map((item, index) => ({
            //         id          :   item?.id            || index,
            //         bus         :   item?.bus_number    || item?.vehicule
            //     }))

            case 'Abonnement':
                if (showForm) {
                    return (
                        <TransportPaymentForm
                            type={subscriptionType}
                            setType={(t) => this.setState({ subscriptionType: t })}
                            arretBus={arretBus}
                            setArretBus={(v) => this.setState({ arretBus: v })}
                            onPay={this.handleSubscribe}
                        />
                    );
                }
                return (
                    <TransportSubscriptionStatus
                        current={currentSubscription}
                        onPlus={() => this.setState({ showForm: true })}
                    />
                );
            default:
                return <DefaultSection title={activeMenu} />;
        }
    };

    render() {
        const { student_infos } = this.props;

        const transportSubscription     = student_infos? student_infos['transport_subscription'] : null;
        const transportBooking          = student_infos ? student_infos['transport_booking'] : [];


        const menus = [
            { id: 'Itinerary', icon: 'map-marker-radius' },
            { id: 'Vehicle allocation', icon: 'bus-clock' },
            { id: 'Abonnement', icon: 'cash-multiple' },
        ];

        return (
            <SafeAreaView style={transportstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={styles.section}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.sectionTitle, styles.textBold]}>Transport</Text>
                    </View>

                    <View style={transportstyle.headerHorizontal}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={transportstyle.navScroll}>
                            {menus.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[transportstyle.navItem, this.state.activeMenu === item.id && transportstyle.navItemActive]}
                                    onPress={() => this.setState({ activeMenu: item.id })}
                                >
                                    <Icon name={item.icon} size={20} color={this.state.activeMenu === item.id ? '#fff' : '#1B497D'} />
                                    <Text style={[transportstyle.navText, this.state.activeMenu === item.id && transportstyle.navTextActive]}>
                                        {item.id}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={transportstyle.contentArea}>
                        {this.renderContent(transportSubscription, transportBooking)}
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const ItinerarySection = ({ liveBuses }) => (
    <ScrollView style={transportstyle.content}>
        <Text style={[transportstyle.title, styles.textBold]}>Radar de Suivi Temps Réel</Text>

        <View style={transportstyle.radarContainer}>
            <View style={transportstyle.radarGridH} /><View style={transportstyle.radarGridV} />
            <View style={[transportstyle.schoolMarker, { left: MAP_SIZE / 2 - 13, top: MAP_SIZE / 2 - 13 }]}>
                <Icon name="school" size={26} color="#1B497D" />
            </View>
            {liveBuses.map(bus => (
                <View key={bus.id} style={[transportstyle.busMarkerContainer, { left: bus.x, top: bus.y, position: 'absolute' }]}>
                    <View style={[transportstyle.busMarkerCircle, { borderColor: bus.routeColor }]}>
                        <Icon name="bus" size={16} color={bus.routeColor} />
                    </View>
                </View>
            ))}
        </View>

        <View style={{ marginTop: 20, paddingBottom: 20 }}>
            <Text style={[transportstyle.label, styles.textBold]}>Statut des chauffeurs</Text>
            {liveBuses.map(bus => (
                <View key={bus.id} style={{
                    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
                    padding: 10, borderRadius: 10, marginBottom: 8,
                    borderLeftWidth: 5, borderLeftColor: bus.routeColor, elevation: 2
                }}>
                    <Icon name="account-circle" size={30} color={bus.routeColor} style={{ marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={[transportstyle.driver, styles.textBold]}>{bus.driver} ({bus.busNumber})</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="map-marker" size={14} color="#666" />
                            <Text style={[transportstyle.place, styles.text]}> Actuellement à : </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: bus.routeColor }}>{bus.currentZone}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[transportstyle.speed, styles.text]}>Vitesse</Text>
                        <Text style={[transportstyle.Speed, styles.textBold]}>{bus.speed} km/h</Text>
                    </View>
                </View>
            ))}
        </View>
        <View style={{ height: 50 }} />
    </ScrollView>
);

const VehicleAllocationSection = ({ allocation }) => (
    <View style={transportstyle.content}>
        <Text style={[transportstyle.title, styles.textBold]}>Tous les véhicules</Text>
        <FlatList data={allocation} renderItem={({ item }) => (
            <View style={transportstyle.allocationCard}>
                <Text style={transportstyle.busNumber}>Bus {item.bus} - {item.driver}</Text>
                <Text style={transportstyle.routeText}>{item.route}</Text>
            </View>
        )} />
    </View>
);

const DefaultSection = ({ title }) => (
    <View style={transportstyle.content}><Text style={transportstyle.title}>{title}</Text></View>
);

const TransportSubscriptionStatus = ({ current, onPlus }) => {
    const base = current?.price || 0;
    const frais = base * 0.02;
    const total = base + frais;

    return (
        <ScrollView style={transportstyle.content}>
            <View style={transportstyle.headerSub}>
                <Text style={[transportstyle.title, styles.textBold]}>Mon abonnement</Text>
                <TouchableOpacity style={transportstyle.addBtn} onPress={onPlus}>
                    <Icon name={current ? "refresh" : "plus"} size={20} color="#fff" />
                    <Text style={[transportstyle.addText, styles.textBold]}>{current ? "CHANGER" : "+"}</Text>
                </TouchableOpacity>
            </View>

            {current ? (
                <View style={transportstyle.subscriptionCard}>
                    <View style={transportstyle.subscriptionHeader}>
                        <Text style={[transportstyle.subscriptionTitle, styles.textBold]}>ABONNEMENT ACTIF</Text>
                        <Icon name="check-circle" size={24} color="#10B981" />
                    </View>
                    <Text style={[transportstyle.subscriptionType, styles.textBold]}>{current.plan} – {current.period}</Text>
                    <View style={transportstyle.separator} />
                    <Text style={[transportstyle.detailText, styles.text]}>Forfait : {base.toLocaleString()} FCFA</Text>
                    <Text style={[transportstyle.detailText, styles.text]}>Frais (2%) : {frais.toLocaleString()} FCFA</Text>
                    <Text style={[transportstyle.detailText, styles.text]}>Arrêt : {current.arretBus || "Non précisé"}</Text>
                    <View style={transportstyle.totalContainer}>
                        <Text style={[transportstyle.totalLabel, styles.textBold]}>NET À PAYER : {total.toLocaleString()} FCFA</Text>
                    </View>
                </View>
            ) : (
                <View style={transportstyle.emptySubscription}>
                    <Icon name="bus-clock" size={80} color="#ccc" />
                    <Text style={[transportstyle.emptyText, styles.text]}>Aucun abonnement en cours</Text>
                </View>
            )}
        </ScrollView>
    );
};

const TransportPaymentForm = ({ type, setType, arretBus, setArretBus, onPay }) => {
    const plans = [
        { label: 'Mensuel', value: 25000, icon: 'calendar-month' },
        { label: 'Trimestriel', value: 70000, icon: 'calendar-range' },
        { label: 'Annuel', value: 210000, icon: 'calendar-star' },
    ];

    const activePlan = plans.find(p => p.label === type) || plans[0];
    const baseAmount = activePlan.value;
    const frais = baseAmount * 0.02;
    const total = baseAmount + frais;
    const isArretValid = arretBus.trim().length > 0;

    const handlePay = () => {
        if (!isArretValid) {
            Alert.alert("Champ obligatoire", "Veuillez indiquer votre arrêt de bus souhaité.");
            return;
        }
        onPay({
            plan: type,
            period: type,
            price: baseAmount,
            arretBus: arretBus.trim(),
            total,
        });
    };

    return (
        <ScrollView style={transportstyle.content} showsVerticalScrollIndicator={false}>
            <Text style={[transportstyle.title, styles.textBold]}>Souscrire un abonnement</Text>

            <Text style={[transportstyle.label, styles.text]}>Option de paiement</Text>
            <View style={transportstyle.planGrid}>
                {plans.map(p => (
                    <TouchableOpacity
                        key={p.label}
                        style={[transportstyle.planCard, type === p.label && transportstyle.planCardActive]}
                        onPress={() => setType(p.label)}
                    >
                        <Icon name={p.icon} size={24} color={type === p.label ? '#fff' : '#1B497D'} />
                        <Text style={[transportstyle.planLabel, styles.text, type === p.label && { color: '#fff' }]}>
                            {p.label}
                        </Text>
                        <Text style={[transportstyle.planPrice, styles.text, type === p.label && { color: '#fff' }]}>
                            {p.value.toLocaleString()} F
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={[transportstyle.label, styles.text]}>Arrêt de bus souhaité *</Text>
            <TextInput
                style={[transportstyle.input, styles.textBold]}
                placeholder="Ex: Plateau, Médina, Almadies..."
                placeholderTextColor="#999"
                value={arretBus}
                onChangeText={setArretBus}
            />

            <View style={transportstyle.summaryBox}>
                <View style={transportstyle.summaryRow}>
                    <Text style={[transportstyle.Text, styles.text]}>Forfait {type}</Text>
                    <Text style={[transportstyle.Text, styles.text]}>{baseAmount.toLocaleString()} FCFA</Text>
                </View>
                <View style={transportstyle.summaryRow}>
                    <Text style={[transportstyle.Text, styles.text]}>Frais de service (2%)</Text>
                    <Text style={[transportstyle.Text, styles.text]}>{frais.toLocaleString()} FCFA</Text>
                </View>
                <View style={transportstyle.totalRow}>
                    <Text style={[styles.textBold, transportstyle.totalText]}>TOTAL</Text>
                    <Text style={[transportstyle.totalText, styles.textBold]}>{total.toLocaleString()} FCFA</Text>
                </View>
            </View>

            <TouchableOpacity
                style={[
                    transportstyle.submitBtn,
                    !isArretValid && { backgroundColor: '#A0A0A0' }
                ]}
                onPress={handlePay}
                disabled={!isArretValid}
            >
                <Text style={[transportstyle.submitBtnText, styles.text]}>
                    Payer la souscription
                </Text>
            </TouchableOpacity>
            <View style={{ height: 80 }} />
        </ScrollView>
    );
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchHomePageAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos          : state.auth.user_infos,
    student_infos       : state.auth.student_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Student_Transport);