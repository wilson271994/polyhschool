import React, { Component } from 'react';
import {
    SafeAreaView, View, Text, ScrollView, TouchableOpacity,
    TextInput, ImageBackground, Image, Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from '../../assets/styles';
import { hostingstyle } from '../../assets/styles/studenthosting';
import { switchStudentMenuAction } from '../../navigations/rootNavigation';

const LOGEMENTS = [
    { label: "Résidence A - Campus principal", value: "res_a", price: 80000 },
    { label: "Résidence B - Annexe", value: "res_b", price: 60000 },
    { label: "Résidence C - Centre-ville", value: "res_c", price: 95000 },
    { label: "Logement externe - Logbessou", value: "logbessou", price: 45000 },
    { label: "Logement externe - Bonamoussadi", value: "bonamoussadi", price: 50000 },
];

class StudentHosting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenu: 'Exploration',
            selectedRoom: null,
            showForm: false,
            currentSubscription: null,
            pendingSubscription: null,
            selectedLogement: null,
            paymentPeriod: 'Mensuel',
            quartier: '',
            availableRooms: [
                { id: 1, title: "Studio Moderne", owner: "M. Dumerile", price: 85000, zone: "Bonanjo", rating: 4.5, x: 60, y: 80, statusColor: "#1B497D", description: "Studio haut standing avec sécurité 24h/24 et groupe électrogène." },
                { id: 2, title: "Chambre Étudiante", owner: "Mme. Arielle", price: 45000, zone: "Logpom", rating: 4.2, x: 210, y: 150, statusColor: "#10B981", description: "Chambre propre, eau gratuite, à 5min de l'université." },
                { id: 3, title: "Appart Partagé", owner: "M. Tagne", price: 35000, zone: "Ange Raphael", rating: 4.0, x: 120, y: 220, statusColor: "#F59E0B", description: "Colocation idéale pour étudiants, grand salon et cuisine équipée." },
                { id: 4, title: "Résidence La Perle", owner: "Résidence Borel", price: 120000, zone: "Akwa", rating: 4.9, x: 250, y: 50, statusColor: "#8B5CF6", description: "Luxe et confort en plein centre ville." },
                { id: 5, title: "Mini Studio", owner: "Mme Lucie", price: 55000, zone: "Yassa", rating: 3.8, x: 40, y: 180, statusColor: "#EF4444", description: "Petit studio indépendant, calme et sécurisé." },
            ],
        };
    }

    _navigateToMenu = () => {
        switchStudentMenuAction(true);
    };

    handleSubscribe = (data) => {
        const { currentSubscription } = this.state;
        if (!currentSubscription) {
            this.setState({ currentSubscription: data, showForm: false, activeMenu: 'Abonnement' });
        } else {
            this.setState({ pendingSubscription: { ...data, status: 'EN ATTENTE' }, showForm: false, activeMenu: 'Abonnement' });
        }
    };

    renderContent = ( hostingSouscription, hostingBooking ) => {
        const { activeMenu, availableRooms, selectedRoom, showForm, currentSubscription, pendingSubscription, paymentPeriod, selectedLogement, quartier } = this.state;

        switch (activeMenu) {
            case 'Exploration':
                return <HostingMapSection rooms={availableRooms} onSelectRoom={(room) => this.setState({ activeMenu: 'Logements', selectedRoom: room })} />;

            case 'Logements':

            const room = hostingBooking.length > 0
                ? hostingBooking.map((item, index) => ({
                    id      : item.id     || index,
                    title   : item.title  || item?.title                || `Logement ${index + 1}`,
                    owner   : item.owner  || item?.landlord             || '--',
                    price   : item.price  || item?.price                || 0,
                    zone    : item.zone   || item?.location             || '--',
                }))
                : availableRooms;

            return selectedRoom ?
                <RoomDetail
                    room={selectedRoom}
                    onBack={() => this.setState({ selectedRoom: null })}
                    onSubscribe={() => this.setState({ activeMenu: 'Abonnement', showForm: true })}
                    /> :
                    <RoomList rooms={availableRooms} onSelect={(r) => this.setState({ selectedRoom: r })} />;

            case 'Abonnement':

                 const Subscription = hostingSouscription && Object.keys(hostingSouscription).length > 0
                ? {
                    type    : hostingSouscription?.subscription_type || hostingSouscription?.room_name  || 'Hébergement',
                    period  : hostingSouscription?.period            || hostingSouscription?.duration   || '--',
                    price   : hostingSouscription?.amount            || hostingSouscription?.price      || 0,
                    quartier: hostingSouscription?.zone              || hostingSouscription?.location   || '',
                }
                : currentSubscription;

                return showForm ?
                    <PaymentForm
                        logements={LOGEMENTS}
                        selectedLogement={selectedLogement}
                        setSelectedLogement={(log) => this.setState({ selectedLogement: log })}
                        period={paymentPeriod}
                        setPeriod={(p) => this.setState({ paymentPeriod: p })}
                        quartier={quartier}
                        setQuartier={(q) => this.setState({ quartier: q })}
                        onPay={this.handleSubscribe}
                    /> :
                    <SubscriptionStatus
                        current={Subscription}
                        pending={pendingSubscription}
                        onPlus={() => this.setState({ showForm: true })}
                    />;

            default: return <DefaultSection title={activeMenu} />;
        }
    };

    render() {
        const { school_user_infos } = this.props

        const hostingSouscription = school_user_infos['student_infos'] ? school_user_infos['hosting_souscription'] : null;
        const hostingBooking = school_user_infos['student_infos'] ? school_user_infos['hosting_booking'] : null;

        const menus = [
            { id: 'Exploration', icon: 'map-marker-radius' },
            { id: 'Logements', icon: 'home-city' },
            { id: 'Abonnement', icon: 'wallet' },
        ];

        return (
            <SafeAreaView style={hostingstyle.container}>
                <ImageBackground source={require('../../assets/images/background.png')} style={styles.backgroundapp} resizeMode="cover">
                    <View style={styles.section}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.sectionTitle, styles.textBold]}>Hébergement</Text>
                    </View>

                    <View style={hostingstyle.headerHorizontal}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={hostingstyle.navScroll}>
                            {menus.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[hostingstyle.navItem, this.state.activeMenu === item.id && hostingstyle.navItemActive]}
                                    onPress={() => this.setState({ activeMenu: item.id, selectedRoom: null, showForm: false })}
                                >
                                    <Icon name={item.icon} size={20} color={this.state.activeMenu === item.id ? '#fff' : '#1B497D'} />
                                    <Text style={[hostingstyle.navText, styles.textBold, this.state.activeMenu === item.id && hostingstyle.navTextActive]}>
                                        {item.id}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={hostingstyle.contentArea}>
                        {this.renderContent(hostingSouscription, hostingBooking)}
                        </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const HostingMapSection = ({ rooms, onSelectRoom }) => (
    <ScrollView style={hostingstyle.content}>
        <Text style={[hostingstyle.title, styles.textBold]}>Logements à proximité</Text>
        <View style={[hostingstyle.radarContainer]}>
            <View style={hostingstyle.radar} />
            <View style={hostingstyle.Radar} />
            <View style={hostingstyle.radarGridH} /><View style={hostingstyle.radarGridV} />
            <View style={[hostingstyle.schoolMarker]}>
                <Icon name="navigation-variant" size={26} color="#1B497D" />
            </View>
            {rooms.map(room => (
                <TouchableOpacity
                    key={room.id}
                    onPress={() => onSelectRoom(room)}
                    style={[hostingstyle.busMarkerContainer, { left: room.x, top: room.y }]}
                >
                    <View style={[hostingstyle.busMarkerCircle, { borderColor: room.statusColor }]}>
                        <Icon name="home" size={18} color={room.statusColor} />
                    </View>
                    <View style={hostingstyle.PriceContainer}>
                        <Text style={[hostingstyle.PriceText, styles.text]}>{room.price / 1000}k</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>

        <Text style={[hostingstyle.label, styles.textBold, { marginTop: 20 }]}>Explorez les offres</Text>
        {rooms.map(room => (
            <TouchableOpacity key={room.id} style={hostingstyle.allocationCard} onPress={() => onSelectRoom(room)}>
                <View style={hostingstyle.allocation}>
                    <Icon name="home-city" size={30} color={room.statusColor} style={{ marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={[hostingstyle.driver, styles.textBold]}>{room.title}</Text>
                        <Text style={[hostingstyle.driver, styles.text]}>{room.zone} • {room.owner}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[hostingstyle.Speed, styles.textBold]}>{room.price.toLocaleString()} F</Text>
                        <Text style={[hostingstyle.Speed, styles.textBold]}>{room.rating} ⭐</Text>
                    </View>
                </View>
            </TouchableOpacity>
        ))}
        <View style={{ height: 70 }} />
    </ScrollView>
);

const RoomList = ({ rooms, onSelect }) => (
    <ScrollView style={hostingstyle.content}>
        <Text style={[hostingstyle.title, styles.textBold]}>Tous les Logements</Text>
        {rooms.map(room => (
            <TouchableOpacity key={room.id} style={hostingstyle.roomCard} onPress={() => onSelect(room)}>
                <View style={hostingstyle.cardRow}>
                    <Icon name="home-city" size={35} color={room.statusColor} />
                    <View style={hostingstyle.cardView}>
                        <Text style={[hostingstyle.roomTitle, styles.textBold]}>{room.title}</Text>
                        <Text style={[hostingstyle.roomSub, styles.text]}>{room.zone} • {room.price.toLocaleString()} F</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#ccc" />
                </View>
            </TouchableOpacity>
        ))}
    </ScrollView>
);

const RoomDetail = ({ room, onBack, onSubscribe }) => (
    <ScrollView style={hostingstyle.content}>
        <TouchableOpacity onPress={onBack} style={hostingstyle.backBtn}>
            <Icon name="arrow-left" size={18} color="#fff" />
            <Text style={[hostingstyle.backText, styles.textBold]}>Retour à la carte</Text>
        </TouchableOpacity>
        <View style={[hostingstyle.detailContainer]}>
            <Text style={[hostingstyle.roomTitle, { color: room.statusColor }]}>{room.title}</Text>
            <Text style={[hostingstyle.roomText, styles.textBold]}>{room.price.toLocaleString()} FCFA / mois</Text>
            <View style={hostingstyle.roomView}>
                <Icon name="account-tie" size={20} color="#666" />
                <Text style={[hostingstyle.text, styles.text]}>Bailleur: {room.owner}</Text>
            </View>
            <Text style={hostingstyle.descriptionText}>{room.description}</Text>
            <TouchableOpacity style={[hostingstyle.submitBtn, { backgroundColor: room.statusColor }]} onPress={onSubscribe}>
                <Text style={hostingstyle.submitBtnText}>RÉSERVER CE LOGEMENT</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
);

const SubscriptionStatus = ({ current, pending, onPlus }) => {
    const basePrice = current?.price || 0;
    const fees = basePrice * 0.02;
    const total = basePrice + fees;

    return (
        <ScrollView style={hostingstyle.content}>
            <View style={hostingstyle.headerSub}>
                <Text style={[hostingstyle.title, styles.textBold]}>Liste des abonnements</Text>
                <TouchableOpacity style={hostingstyle.addBtn} onPress={onPlus}>
                    <Icon name={current ? "refresh" : "plus"} size={20} color="#fff" />
                    <Text style={[hostingstyle.addText, styles.textBold]}>{current ? "CHANGER" : "+"}</Text>
                </TouchableOpacity>
            </View>

            {current ? (
                <View style={[hostingstyle.legendCard]}>
                    <View style={hostingstyle.legendView}>
                        <Text style={[hostingstyle.legendText, styles.textBold]}>ABONNEMENT ACTIF</Text>
                        <Icon name="check-circle" size={24} color="#10B981" />
                    </View>
                    <Text style={[hostingstyle.currentText, styles.textBold]}>{current.type}</Text>
                    <View style={hostingstyle.currentView} />
                    <Text style={[hostingstyle.Text, styles.text]}>Prix mensuel : {basePrice.toLocaleString()} F</Text>
                    <Text style={[hostingstyle.Text, styles.text]}>Période : {current.period}</Text>
                    <Text style={[hostingstyle.Text, styles.text]}>Frais (2%) : {fees.toLocaleString()} F</Text>
                    <View style={hostingstyle.totalView}>
                        <Text style={[hostingstyle.totaltext, styles.textBold]}>NET À PAYER : {total.toLocaleString()} FCFA</Text>
                    </View>
                </View>
            ) : (
                <View style={hostingstyle.abonnementContainer}>
                    <Icon name="home" size={80} color="#ccc" />
                    <Text style={[hostingstyle.abonnementText, styles.text]}>Aucun abonnement en cours</Text>
                </View>
            )}
        </ScrollView>
    );
};

const PaymentForm = ({ logements, selectedLogement, setSelectedLogement, period, setPeriod, quartier, setQuartier, onPay }) => {

    const periods = [
        { label: 'Mensuel', value: 1, icon: 'calendar-month' },
        { label: 'Trimestriel', value: 3, icon: 'calendar-range' },
        { label: 'Annuel', value: 12, icon: 'calendar-star' },
    ];

    const logement = selectedLogement;
    const moisMultiplier = periods.find(p => p.label === period)?.value || 1;
    const prixMensuel = logement ? logement.price : 0;
    const montantLogement = prixMensuel * moisMultiplier;
    const fraisService = montantLogement * 0.02;
    const netAPayer = montantLogement + fraisService;

    const handleValidation = () => {
        if (!logement) {
            Alert.alert("Erreur", "Veuillez sélectionner un logement.");
            return;
        }
        onPay({
            type: logement.label,
            price: prixMensuel,
            period: period,
            quartier,
            total: netAPayer,
            frais: fraisService,
        });
    };

    return (
        <ScrollView style={hostingstyle.content}>
            <Text style={[hostingstyle.title, styles.text]}>Nouvel abonnement</Text>

            <Text style={[hostingstyle.label, styles.textBold]}>Période de paiement</Text>
            <View style={hostingstyle.planGrid}>
                {periods.map(p => (
                    <TouchableOpacity
                        key={p.label}
                        style={[hostingstyle.planCard, period === p.label && hostingstyle.planCardActive]}
                        onPress={() => setPeriod(p.label)}
                    >
                        <Icon name={p.icon} size={24} color={period === p.label ? '#fff' : '#1B497D'} />
                        <Text style={[hostingstyle.planLabel, period === p.label && { color: '#fff' }]}>{p.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={[hostingstyle.label, styles.textBold]}>Choisir un logement (pack)</Text>
            <Dropdown
                style={hostingstyle.dropdown}
                placeholderStyle={hostingstyle.placeholderStyle}
                selectedTextStyle={hostingstyle.selectedTextStyle}
                inputSearchStyle={hostingstyle.inputSearchStyle}
                iconStyle={hostingstyle.iconStyle}
                containerStyle={hostingstyle.dropdownContainer}
                itemContainerStyle={hostingstyle.itemContainerStyle}
                itemTextStyle={[hostingstyle.itemTextStyle, styles.text]}
                data={logements}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Sélectionnez un logement"
                searchPlaceholder="Rechercher..."
                value={selectedLogement?.value}
                onChange={item => setSelectedLogement(item)}
                renderLeftIcon={() => (
                    <Icon name="home-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                )}
            />
            {logement && (
                <View style={{ marginBottom: 15 }}>
                    <Text style={[styles.text, { color: '#FFF' }]}>
                        Loyer mensuel : {logement.price.toLocaleString()} FCFA
                    </Text>
                </View>
            )}

            <TextInput
                style={[hostingstyle.input, styles.textBold]}
                placeholder="Quartier souhaité (optionnel)"
                placeholderTextColor="#999"
                value={quartier}
                onChangeText={setQuartier}
            />

            <View style={hostingstyle.summaryBox}>
                <Text style={[styles.textBold, { color: '#1B497D', marginBottom: 10, fontSize: 16 }]}>Détail du paiement</Text>
                <View style={hostingstyle.summaryRow}>
                    <Text style={[hostingstyle.Text, styles.text]}>Logement</Text>
                    <Text style={[hostingstyle.Text, styles.text]}>{logement?.label || "-"}</Text>
                </View>
                <View style={hostingstyle.summaryRow}>
                    <Text style={[hostingstyle.Text, styles.text]}>Période</Text>
                    <Text style={[hostingstyle.Text, styles.text]}>{period} ({moisMultiplier} mois)</Text>
                </View>
                <View style={hostingstyle.summaryRow}>
                    <Text style={[hostingstyle.Text, styles.text]}>Montant logement</Text>
                    <Text style={[hostingstyle.Text, styles.text]}>{montantLogement.toLocaleString()} F</Text>
                </View>
                <View style={hostingstyle.summaryRow}>
                    <Text style={[hostingstyle.Text, styles.text]}>Frais de service (2%)</Text>
                    <Text style={[hostingstyle.Text, styles.text]}>{fraisService.toLocaleString()} F</Text>
                </View>
                <View style={hostingstyle.totalRow}>
                    <Text style={[hostingstyle.totalText, styles.textBold]}>NET À PAYER</Text>
                    <Text style={[hostingstyle.totalText, styles.textBold]}>{netAPayer.toLocaleString()} FCFA</Text>
                </View>
            </View>

            <TouchableOpacity
                style={[hostingstyle.submitBtn, !logement && { backgroundColor: '#A0A0A0' }]}
                onPress={handleValidation}
            >
                <Text style={[hostingstyle.submitBtnText, styles.textBold]}>PAYER {netAPayer.toLocaleString()} F</Text>
            </TouchableOpacity>
            <View style={{ height: 80 }} />
        </ScrollView>
    );
};

const DefaultSection = ({ title }) => (
    <View style={hostingstyle.content}><Text style={hostingstyle.title}>{title}</Text></View>
);

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchStudentMenuAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos          : state.auth.user_infos,
    school_user_infos   : state.auth.school_user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentHosting);