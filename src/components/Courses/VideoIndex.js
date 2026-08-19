import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View, Text, TouchableOpacity, Image, TextInput, Modal, Platform,
    SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Dimensions
} from 'react-native';
import Video from 'react-native-video';
import 'moment/locale/fr';
import moment from 'moment';
import { switchHeaderAction } from '../../reducers/actions/index.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../assets/styles/index.js';
import { videostyle } from '../../assets/styles/video.js';
import { switchCoursePageAction } from '../../navigations/rootNavigation.js';
import { SwipeablePanel } from 'rn-swipeable-panel';

const { width } = Dimensions.get('window');

class VideoIndex extends PureComponent {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.progressBarRef = React.createRef();
        this.progressWidth = 0;

        this.state = {
            isVisibleMenu: false,
            isModalVisible: false,
            commentText: '',
            editingCommentId: null,
            editingReplyId: null,
            editingParentId: null,
            replyingTo: null,
            isPlaying: false,
            isMuted: false,
            currentTime: 0,
            duration: 0,
            isFullscreen: false,
            showCenterPlayButton: true,
            showControls: true,
            showExitFullscreenButton: false,
            controlsTimeout: null,
            exitButtonTimeout: null,
            comments: [
                {
                    id: 1,
                    author: '@Dilanjames',
                    email: 'dilan.james@example.com',
                    text: "J'apprécie beaucoup votre cours vous avez une bonne explication",
                    date: moment().subtract(5, 'days').toISOString(),
                    likes: 12,
                    dislikes: 2,
                    userLiked: false,
                    userDisliked: false,
                    replies: []
                },
                {
                    id: 2,
                    author: '@SophieMartin',
                    email: 'sophie.martin@example.com',
                    text: "Je suis vraiment satisfait du cours",
                    date: moment().subtract(3, 'days').toISOString(),
                    likes: 8,
                    dislikes: 1,
                    userLiked: false,
                    userDisliked: false,
                    replies: []
                },
                {
                    id: 3,
                    author: '@PaulDurand',
                    email: 'paul.durand@example.com',
                    text: "Je suis nouveau sur la plateforme",
                    date: moment().subtract(2, 'days').toISOString(),
                    likes: 5,
                    dislikes: 0,
                    userLiked: false,
                    userDisliked: false,
                    replies: []
                },
                {
                    id: 4,
                    author: '@MarieClaire',
                    email: 'marie.claire@example.com',
                    text: "Je comprends pas vraiment le dernier module",
                    date: moment().subtract(1, 'days').toISOString(),
                    likes: 3,
                    dislikes: 4,
                    userLiked: false,
                    userDisliked: false,
                    replies: []
                },
                {
                    id: 5,
                    author: '@JeanPierre',
                    email: 'jean.pierre@example.com',
                    text: "Merci monsieur vous nous simplifiez les cours",
                    date: moment().subtract(12, 'hours').toISOString(),
                    likes: 15,
                    dislikes: 0,
                    userLiked: false,
                    userDisliked: false,
                    replies: []
                }
            ]
        };
    }

    componentWillUnmount() {
        if (this.state.controlsTimeout) clearTimeout(this.state.controlsTimeout);
        if (this.state.exitButtonTimeout) clearTimeout(this.state.exitButtonTimeout);
        if (this.state.isFullscreen) this.exitFullscreen();
    }

    // ---- Navigation et menu ----
    _navigateToCourse = () => {
        switchCoursePageAction(true)
    }

    _toggleMenu = () => {
        this.setState(prev => ({ isVisibleMenu: !prev.isVisibleMenu }))
    }

    // ---- Video handlers ----
    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };

    onProgress = (data) => {
        this.setState({
            currentTime: Math.min(Math.max(0, data.currentTime), this.state.duration || 0)
        });
    };

    onEnd = () => {
        this.setState({
            isPlaying: false,
            showCenterPlayButton: true,
            currentTime: this.state.duration || 0
        });
    };

    seekVideo = (time) => {
        const safeTime = Math.max(0, Math.min(time, this.state.duration || 0));
        if (this.videoRef.current) {
            this.videoRef.current.seek(safeTime);
            this.setState({ currentTime: safeTime });
        }
    };

    handleProgressLayout = (e) => {
        this.progressWidth = e.nativeEvent.layout.width;
    };

    handleProgressPress = (e) => {
        const { duration } = this.state;
        if (duration <= 0 || this.progressWidth <= 0) return;

        const locationX = e.nativeEvent?.locationX || 0;
        let percentage = locationX / this.progressWidth;
        percentage = Math.max(0, Math.min(1, percentage));

        const newTime = percentage * duration;
        this.seekVideo(newTime);
    };

    togglePlayPause = () => {
        const { isPlaying } = this.state;
        this.setState({
            isPlaying: !isPlaying,
            showCenterPlayButton: isPlaying,
            showControls: true
        });

        if (!isPlaying) {
            const timeout = setTimeout(() => {
                this.setState({ showControls: false });
            }, 3000);
            this.setState({ controlsTimeout: timeout });
        } else if (this.state.controlsTimeout) {
            clearTimeout(this.state.controlsTimeout);
            this.setState({ controlsTimeout: null });
        }
    };

    toggleMute = () => {
        this.setState(prev => ({ isMuted: !prev.isMuted }));
        this.showVideoControls();
    };

    showVideoControls = () => {
        const { isPlaying, isFullscreen, controlsTimeout } = this.state;

        this.setState({
            showControls: true,
            showExitFullscreenButton: isFullscreen
        });

        if (isPlaying && controlsTimeout) {
            clearTimeout(controlsTimeout);
        }

        if (isPlaying) {
            const timeout = setTimeout(() => {
                this.setState({ showControls: false, showExitFullscreenButton: false });
            }, 3000);
            this.setState({ controlsTimeout: timeout });
        }

        if (isFullscreen) {
            if (this.state.exitButtonTimeout) clearTimeout(this.state.exitButtonTimeout);
            const exitTimeout = setTimeout(() => this.setState({ showExitFullscreenButton: false }), 3000);
            this.setState({ exitButtonTimeout: exitTimeout });
        }
    };

    enterFullscreen = () => {
        try {
            if (Platform.OS === 'web') {
                const elem = document.documentElement;
                if (elem.requestFullscreen) elem.requestFullscreen();
                else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
                else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
            }

            this.setState({
                isFullscreen: true,
                showControls: true,
                showExitFullscreenButton: true
            });

            if (this.state.isPlaying) {
                const timeout = setTimeout(() => this.setState({ showControls: false, showExitFullscreenButton: false }), 3000);
                this.setState({ controlsTimeout: timeout });
            }
        } catch (error) {
            console.log('Erreur plein écran:', error);
        }
    };

    exitFullscreen = () => {
        try {
            if (Platform.OS === 'web') {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
            }

            this.setState({
                isFullscreen: false,
                showControls: true,
                showExitFullscreenButton: false
            });
        } catch (error) {
            console.log('Erreur sortie plein écran:', error);
        }
    };

    toggleFullscreen = () => {
        const { isFullscreen } = this.state;
        if (isFullscreen) this.exitFullscreen();
        else this.enterFullscreen();
        this.showVideoControls();
    };

    formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "00:00";
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    getProgressPercentage = () => {
        if (this.state.duration === 0) return 0;
        return (this.state.currentTime / this.state.duration) * 100;
    };

    // ---- Commentaires : gestion des modales ----
    openCommentModal = () => {
        this.setState({
            isVisibleMenu: false,
            isModalVisible: true,
            commentText: '',
            editingCommentId: null,
            editingReplyId: null,
            editingParentId: null,
            replyingTo: null
        });
    }

    handleCommentPress = (comment) => {
        const { user_infos } = this.props;
        const isOwnComment = user_infos?.email === comment.email;

        if (!isOwnComment) {
            this.openReplyModal(comment);
        }
    }

    handleCommentLongPress = (comment) => {
        const { user_infos } = this.props;
        const isOwnComment = user_infos?.email === comment.email;

        if (isOwnComment) {
            this.openEditModal(comment);
        }
    }

    handleReplyPress = (reply) => {
        const { user_infos } = this.props;
        const isOwnReply = user_infos?.email === reply.email;

        if (!isOwnReply) {
            this.openReplyToReplyModal(reply);
        }
    }

    handleReplyLongPress = (reply, parentId) => {
        const { user_infos } = this.props;
        const isOwnReply = user_infos?.email === reply.email;

        if (isOwnReply) {
            this.openEditReplyModal(reply, parentId);
        }
    }

    openEditModal = (comment) => {
        this.setState({
            isVisibleMenu: false,
            isModalVisible: true,
            commentText: comment.text,
            editingCommentId: comment.id,
            editingReplyId: null,
            editingParentId: null,
            replyingTo: null
        });
    }

    openEditReplyModal = (reply, parentId) => {
        this.setState({
            isVisibleMenu: false,
            isModalVisible: true,
            commentText: reply.text,
            editingCommentId: null,
            editingReplyId: reply.id,
            editingParentId: parentId,
            replyingTo: null
        });
    }

    openReplyModal = (comment) => {
        this.setState({
            isVisibleMenu: false,
            isModalVisible: true,
            commentText: '',
            editingCommentId: null,
            editingReplyId: null,
            editingParentId: null,
            replyingTo: comment
        });
    }

    openReplyToReplyModal = (reply) => {
        this.setState({
            isVisibleMenu: false,
            isModalVisible: true,
            commentText: '',
            editingCommentId: null,
            editingReplyId: null,
            editingParentId: null,
            replyingTo: reply
        });
    }

    closeCommentModal = () => {
        this.setState({
            isModalVisible: false,
            commentText: '',
            editingCommentId: null,
            editingReplyId: null,
            editingParentId: null,
            replyingTo: null
        });
    }

    submitComment = () => {
        const { commentText, editingCommentId, editingReplyId, editingParentId, replyingTo, comments } = this.state;
        const { user_infos } = this.props;

        if (!commentText.trim()) {
            return;
        }

        if (editingCommentId) {
            this.setState({
                comments: comments.map(comment =>
                    comment.id === editingCommentId
                        ? {
                            ...comment,
                            text: commentText.trim(),
                            edited: true,
                            editDate: new Date().toISOString()
                        }
                        : comment
                ),
                isModalVisible: false,
                commentText: '',
                editingCommentId: null,
                replyingTo: null
            });
        } else if (editingReplyId) {
            this.setState({
                comments: comments.map(comment =>
                    comment.id === editingParentId
                        ? {
                            ...comment,
                            replies: comment.replies.map(reply =>
                                reply.id === editingReplyId
                                    ? {
                                        ...reply,
                                        text: commentText.trim(),
                                        edited: true,
                                        editDate: new Date().toISOString()
                                    }
                                    : reply
                            )
                        }
                        : comment
                ),
                isModalVisible: false,
                commentText: '',
                editingReplyId: null,
                editingParentId: null,
                replyingTo: null
            });
        } else if (replyingTo) {
            const isReplyingToReply = replyingTo.hasOwnProperty('isReply');

            if (isReplyingToReply) {
                const parentComment = comments.find(c =>
                    c.replies && c.replies.some(r => r.id === replyingTo.id)
                );

                if (parentComment) {
                    const newReply = {
                        id: Date.now(),
                        author: user_infos?.username || '@Utilisateur',
                        email: user_infos?.email || 'utilisateur@example.com',
                        text: commentText.trim(),
                        date: new Date().toISOString(),
                        likes: 0,
                        dislikes: 0,
                        userLiked: false,
                        userDisliked: false,
                        edited: false,
                        isReply: true,
                        parentAuthor: replyingTo.author
                    };

                    this.setState({
                        comments: comments.map(comment =>
                            comment.id === parentComment.id
                                ? {
                                    ...comment,
                                    replies: [...(comment.replies || []), newReply]
                                }
                                : comment
                        ),
                        isModalVisible: false,
                        commentText: '',
                        replyingTo: null
                    });
                }
            } else {
                const newReply = {
                    id: Date.now(),
                    author: user_infos?.username || '@Utilisateur',
                    email: user_infos?.email || 'utilisateur@example.com',
                    text: commentText.trim(),
                    date: new Date().toISOString(),
                    likes: 0,
                    dislikes: 0,
                    userLiked: false,
                    userDisliked: false,
                    edited: false,
                    isReply: true,
                    parentAuthor: replyingTo.author
                };

                this.setState({
                    comments: comments.map(comment =>
                        comment.id === replyingTo.id
                            ? {
                                ...comment,
                                replies: [...(comment.replies || []), newReply]
                            }
                            : comment
                    ),
                    isModalVisible: false,
                    commentText: '',
                    replyingTo: null
                });
            }
        } else {
            const newComment = {
                id: Date.now(),
                author: user_infos?.username || '@Utilisateur',
                email: user_infos?.email || 'utilisateur@example.com',
                text: commentText.trim(),
                date: new Date().toISOString(),
                likes: 0,
                dislikes: 0,
                userLiked: false,
                userDisliked: false,
                edited: false,
                replies: []
            };

            this.setState({
                comments: [newComment, ...comments],
                isModalVisible: false,
                commentText: '',
                editingCommentId: null,
                replyingTo: null
            });
        }
    }

    deleteComment = (commentId, isReply = false, parentId = null) => {
        Alert.alert(
            'Supprimer le commentaire',
            'Voulez-vous vraiment supprimer ce commentaire ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        if (isReply && parentId) {
                            this.setState({
                                comments: this.state.comments.map(comment =>
                                    comment.id === parentId
                                        ? {
                                            ...comment,
                                            replies: comment.replies.filter(reply => reply.id !== commentId)
                                        }
                                        : comment
                                )
                            });
                        } else {
                            this.setState({
                                comments: this.state.comments.filter(comment => comment.id !== commentId)
                            });
                        }
                    }
                }
            ]
        );
    }

    isSubmitDisabled = () => {
        return !this.state.commentText.trim();
    }

    formatDate = (dateISO) => {
        const date = moment(dateISO);
        const now = moment();

        if (now.diff(date, 'minutes') < 1) {
            return 'à l\'instant';
        } else if (now.diff(date, 'hours') < 1) {
            return `il y a ${now.diff(date, 'minutes')} minutes`;
        } else if (now.diff(date, 'days') < 1) {
            return `il y a ${now.diff(date, 'hours')} heures`;
        } else if (now.diff(date, 'days') < 7) {
            return `il y a ${now.diff(date, 'days')} jours`;
        } else {
            return date.format('DD/MM/YYYY');
        }
    }

    handleLike = (commentId, isReply = false, parentId = null) => {
        this.setState(prevState => ({
            comments: prevState.comments.map(comment => {
                if (isReply && parentId === comment.id) {
                    return {
                        ...comment,
                        replies: comment.replies.map(reply => {
                            if (reply.id === commentId) {
                                if (reply.userLiked) {
                                    return { ...reply, likes: reply.likes - 1, userLiked: false };
                                } else {
                                    return {
                                        ...reply,
                                        likes: reply.likes + 1,
                                        dislikes: reply.userDisliked ? reply.dislikes - 1 : reply.dislikes,
                                        userLiked: true,
                                        userDisliked: false
                                    };
                                }
                            }
                            return reply;
                        })
                    };
                } else if (comment.id === commentId && !isReply) {
                    if (comment.userLiked) {
                        return { ...comment, likes: comment.likes - 1, userLiked: false };
                    } else {
                        return {
                            ...comment,
                            likes: comment.likes + 1,
                            dislikes: comment.userDisliked ? comment.dislikes - 1 : comment.dislikes,
                            userLiked: true,
                            userDisliked: false
                        };
                    }
                }
                return comment;
            })
        }));
    }

    handleDislike = (commentId, isReply = false, parentId = null) => {
        this.setState(prevState => ({
            comments: prevState.comments.map(comment => {
                if (isReply && parentId === comment.id) {
                    return {
                        ...comment,
                        replies: comment.replies.map(reply => {
                            if (reply.id === commentId) {
                                if (reply.userDisliked) {
                                    return { ...reply, dislikes: reply.dislikes - 1, userDisliked: false };
                                } else {
                                    return {
                                        ...reply,
                                        dislikes: reply.dislikes + 1,
                                        likes: reply.userLiked ? reply.likes - 1 : reply.likes,
                                        userDisliked: true,
                                        userLiked: false
                                    };
                                }
                            }
                            return reply;
                        })
                    };
                } else if (comment.id === commentId && !isReply) {
                    if (comment.userDisliked) {
                        return { ...comment, dislikes: comment.dislikes - 1, userDisliked: false };
                    } else {
                        return {
                            ...comment,
                            dislikes: comment.dislikes + 1,
                            likes: comment.userLiked ? comment.likes - 1 : comment.likes,
                            userDisliked: true,
                            userLiked: false
                        };
                    }
                }
                return comment;
            })
        }));
    }

    // ---- Rendu des commentaires ----
    renderCommentActions = (comment, isReply = false, parentId = null) => {
        return (
            <View style={videostyle.commentActions}>
                <TouchableOpacity onPress={() => this.handleLike(comment.id, isReply, parentId)} style={videostyle.actionButton}>
                    <Icon name={comment.userLiked ? "thumb-up" : "thumb-up-outline"} size={16} color={comment.userLiked ? "#1B497D" : "#999"} />
                    <Text style={[videostyle.actionCount, comment.userLiked && videostyle.actionCountActive]}>{comment.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleDislike(comment.id, isReply, parentId)} style={videostyle.actionButton}>
                    <Icon name={comment.userDisliked ? "thumb-down" : "thumb-down-outline"} size={16} color={comment.userDisliked ? "#1B497D" : "#999"} />
                    <Text style={[videostyle.actionCount, comment.userDisliked && videostyle.actionCountActive]}>{comment.dislikes}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderComment = (comment, isReply = false, parentId = null) => {
        const { user_infos } = this.props;
        const isOwnComment = user_infos?.email === comment.email;

        const handlePress = isReply
            ? () => this.handleReplyPress(comment)
            : () => this.handleCommentPress(comment);

        const handleLongPress = isReply
            ? () => this.handleReplyLongPress(comment, parentId)
            : () => this.handleCommentLongPress(comment);

        return (
            <View key={comment.id} style={[videostyle.commentCard, isReply && videostyle.replyCard]}>
                <Image
                    source={require('../../assets/images/profil.png')}
                    style={videostyle.commentAvatar}
                />
                <TouchableOpacity
                    style={videostyle.commentContent}
                    onPress={handlePress}
                    onLongPress={handleLongPress}
                    delayLongPress={300}
                    activeOpacity={0.7}
                >
                    <View style={videostyle.commentHeader}>
                        <Text style={[videostyle.commentAuthor, styles.textBold]}>
                            {comment.author}
                            {isReply && (
                                <Text style={videostyle.replyToText}>
                                    {" "}en réponse à @{comment.parentAuthor}
                                </Text>
                            )}
                        </Text>
                        <Text style={[videostyle.commentEmail, styles.text]}>
                            {comment.email}
                        </Text>
                    </View>
                    <Text style={[videostyle.commentMeta, styles.text]}>
                        {this.formatDate(comment.date)}
                        {comment.edited && (
                            <Text style={videostyle.editedText}> (modifié)</Text>
                        )}
                    </Text>
                    <Text style={[videostyle.commentText, styles.textBold]}>
                        {comment.text}
                    </Text>
                    {isOwnComment && !isReply && (
                        <Text style={videostyle.editHint}>Appui long pour modifier ou supprimer</Text>
                    )}
                    {isOwnComment && isReply && (
                        <Text style={videostyle.editHint}>Appui long pour modifier ou supprimer</Text>
                    )}
                    {!isOwnComment && (
                        <Text style={videostyle.editHint}>Cliquez pour répondre</Text>
                    )}
                </TouchableOpacity>
                {this.renderCommentActions(comment, isReply, parentId)}
                {isOwnComment && !isReply && (
                    <TouchableOpacity onPress={() => this.deleteComment(comment.id)} style={videostyle.deleteButton}>
                        <Icon name="delete-outline" size={18} color="#FF4444" />
                    </TouchableOpacity>
                )}
                {isOwnComment && isReply && (
                    <TouchableOpacity onPress={() => this.deleteComment(comment.id, true, parentId)} style={videostyle.deleteButton}>
                        <Icon name="delete-outline" size={16} color="#FF4444" />
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    renderCommentWithReplies = (comment) => {
        return (
            <View key={comment.id}>
                {this.renderComment(comment)}
                {comment.replies && comment.replies.length > 0 && (
                    <View style={videostyle.repliesContainer}>
                        {comment.replies.map(reply => this.renderComment(reply, true, comment.id))}
                    </View>
                )}
            </View>
        );
    }

    // ---- Render principal ----
    render() {
        const {
            isVisibleMenu, isModalVisible, commentText, editingCommentId, editingReplyId, replyingTo,
            isPlaying, isMuted, currentTime, duration, isFullscreen,
            showCenterPlayButton, showControls, showExitFullscreenButton
        } = this.state;

        const isEditing = editingCommentId !== null || editingReplyId !== null;
        const isReplying = replyingTo !== null;
        const isSubmitDisabled = this.isSubmitDisabled();

        let modalTitle = "Laisser un commentaire";
        let buttonText = "Publier";

        if (isEditing) {
            modalTitle = "Modifier le commentaire";
            buttonText = "Modifier";
        } else if (isReplying) {
            modalTitle = `Répondre à ${replyingTo.author}`;
            buttonText = "Répondre";
        }

        const fullscreenContainerStyle = isFullscreen ? { flex: 1, backgroundColor: '#000' } : {};

        return (
            <SafeAreaView style={[videostyle.container, fullscreenContainerStyle]}>
                {!isFullscreen && (
                    <View style={videostyle.header}>
                        <View style={styles.section2}>
                            <View style={styles.back}>
                                <TouchableOpacity onPress={this._navigateToCourse}>
                                    <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.sectionTitle, styles.textBold, { color: '#FFF' }]}>Titre de la vidéo</Text>
                        </View>

                        <TouchableOpacity style={videostyle.searchContainer} onPress={this._toggleMenu}>
                            <Icon name="dots-vertical" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={[videostyle.videoPlayerContainer, isFullscreen && { flex: 1, justifyContent: 'center', padding: 0 }]}>
                    <View style={[videostyle.videoWrapper, isFullscreen && { height: '100%', width: '100%' }]}>
                        <Video
                            ref={this.videoRef}
                            source={require('../../assets/videos/1.mp4')}
                            style={[videostyle.video, isFullscreen && { height: '100%', width: '100%' }]}
                            resizeMode="contain"
                            paused={!isPlaying}
                            muted={isMuted}
                            onLoad={this.onLoad}
                            onProgress={this.onProgress}
                            onEnd={this.onEnd}
                            onError={(e) => console.log('Video Error:', e)}
                            repeat={false}
                            controls={false}
                        />

                        <TouchableOpacity
                            style={[videostyle.videoOverlayTouch, isFullscreen && { height: '100%' }]}
                            activeOpacity={1}
                            onPress={this.showVideoControls}
                        >
                            {showCenterPlayButton && !isPlaying && (
                                <View style={videostyle.videoOverlay}>
                                    <TouchableOpacity style={videostyle.playButtonCenter} onPress={this.togglePlayPause}>
                                        <Icon name="play" size={50} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                            )}

                            {isFullscreen && showExitFullscreenButton && (
                                <TouchableOpacity style={videostyle.exitFullscreenButton} onPress={this.exitFullscreen}>
                                    <Icon name="fullscreen-exit" size={28} color="#FFF" />
                                </TouchableOpacity>
                            )}

                            {showControls && (
                                <View style={[
                                    videostyle.controlsContainer,
                                    isFullscreen && { paddingHorizontal: 40, marginBottom: 40 }
                                ]}>
                                    <TouchableOpacity onPress={this.togglePlayPause} style={videostyle.controlButton}>
                                        <Icon
                                            name={isPlaying ? "pause" : "play"}
                                            size={isFullscreen ? 40 : 24}
                                            color="#FFF"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.toggleMute} style={videostyle.controlButton}>
                                        <Icon
                                            name={isMuted ? "volume-off" : "volume-high"}
                                            size={isFullscreen ? 40 : 24}
                                            color="#FFF"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            videostyle.progressContainer,
                                            isFullscreen && { paddingVertical: 20 }
                                        ]}
                                        activeOpacity={1}
                                        onPress={this.handleProgressPress}
                                        onLayout={this.handleProgressLayout}
                                    >
                                        <View style={[
                                            videostyle.progressBar,
                                            isFullscreen && { height: 6, borderRadius: 3 }
                                        ]}>
                                            <View style={[
                                                videostyle.progressFill,
                                                { width: `${this.getProgressPercentage()}%` }
                                            ]} />
                                            <View style={[
                                                videostyle.progressHandle,
                                                { left: `${this.getProgressPercentage()}%` },
                                                isFullscreen && {
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 10,
                                                    top: -7,
                                                    marginLeft: -10,
                                                }
                                            ]} />
                                        </View>
                                        <View style={videostyle.timeContainer}>
                                            <Text style={videostyle.timeText}>
                                                {this.formatTime(currentTime)} / {this.formatTime(duration)}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.toggleFullscreen} style={videostyle.controlButton}>
                                        <Icon
                                            name={isFullscreen ? "fullscreen-exit" : "fullscreen"}
                                            size={24}
                                            color="#FFF"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/* Badge "En ligne" */}
                            <View style={[videostyle.onlineStatus, isFullscreen && { top: 20, right: 20 }]}>
                                <View style={videostyle.onlineDot} />
                                <Text style={[videostyle.onlineText, styles.textBold]}>En ligne</Text>
                                <Icon name="broadcast" size={14} color="#00D1C6" style={{ marginLeft: 5 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {!isFullscreen && (
                    <ScrollView style={videostyle.commentsContainer}>
                        <Text style={[videostyle.commentsTitle, styles.textBold]}>
                            Commentaires ({this.state.comments.length})
                        </Text>
                        {this.state.comments.map(comment => this.renderCommentWithReplies(comment))}
                        <View style={{ height: 60 }} />
                    </ScrollView>
                )}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={this.closeCommentModal}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={videostyle.modalContainer}
                    >
                        <View style={videostyle.modalContent}>
                            <View style={videostyle.modalHeader}>
                                <Text style={[videostyle.modalTitle, styles.textBold]}>{modalTitle}</Text>
                                <TouchableOpacity onPress={this.closeCommentModal}>
                                    <Icon name="close" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            {isReplying && (
                                <View style={videostyle.replyPreview}>
                                    <Icon name="reply" size={16} color="#1B497D" style={{ marginRight: 8 }} />
                                    <Text style={videostyle.replyPreviewText}>
                                        Réponse à : {replyingTo.text.substring(0, 100)}{replyingTo.text.length > 100 ? '...' : ''}
                                    </Text>
                                </View>
                            )}

                            <TextInput
                                style={videostyle.commentInput}
                                placeholder={isReplying ? "Votre réponse..." : "Votre commentaire..."}
                                placeholderTextColor="#999"
                                multiline={true}
                                numberOfLines={2}
                                value={commentText}
                                onChangeText={(text) => this.setState({ commentText: text })}
                            />

                            <View style={videostyle.modalButtons}>
                                <TouchableOpacity style={[videostyle.modalButton, videostyle.cancelButton]} onPress={this.closeCommentModal}>
                                    <Text style={[videostyle.buttonText, styles.textBold]}>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[videostyle.modalButton, videostyle.submitButton, isSubmitDisabled && videostyle.disabledButton]}
                                    onPress={this.submitComment}
                                    disabled={isSubmitDisabled}
                                >
                                    <Text style={[videostyle.buttonText, styles.textBold, { color: '#FFF' }]}>{buttonText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>

                <SwipeablePanel
                    fullWidth={true}
                    openLarge={true}
                    closeOnTouchOutside={true}
                    showCloseButton={true}
                    isActive={isVisibleMenu}
                    onClose={() => this.setState({ isVisibleMenu: false })}
                    onPressCloseButton={() => this.setState({ isVisibleMenu: false })}
                    style={videostyle.containermenu}
                    barContainerStyle={videostyle.swipablepanelbarstyle}
                    closeRootStyle={videostyle.swipablepanelcloseicon}
                >
                    <ScrollView style={videostyle.menuitemscroll}>
                        <TouchableOpacity onPress={this.openCommentModal} style={videostyle.headermenuitem}>
                            <Icon name="comment-outline" size={24} color="#1B497D" />
                            <Text style={[videostyle.menulisttext, styles.text]}>Laisser un commentaire</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={videostyle.headermenuitem}>
                            <Icon name="share-outline" size={24} color="#1B497D" />
                            <Text style={[videostyle.menulisttext, styles.text]}>Partager dans une page</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={videostyle.headermenuitem}>
                            <Icon name="share-variant" size={24} color="#1B497D" />
                            <Text style={[videostyle.menulisttext, styles.text]}>Autres possibilités de partage</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={videostyle.headermenuitem}>
                            <Icon name="information-outline" size={24} color="#1B497D" />
                            <Text style={[videostyle.menulisttext, styles.text]}>À propos</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SwipeablePanel>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchHeaderAction, switchCoursePageAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps, null)(VideoIndex);