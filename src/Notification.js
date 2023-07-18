import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import axios from 'axios';

const NotificationPopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setUnreadNotificationsCount(0); // Сбросить счетчик непрочитанных уведомлений при открытии popover
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const professionalId = '64b6e78bcd25f291eb94b1d9';

    useEffect(() => {
        const eventSource = new EventSource(
            `http://localhost:3000/sse/notify/${professionalId}`
        );
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (!data.ping) {
                setUnreadNotificationsCount((count) => count + 1);
                setNotifications((prevState) => [data, ...prevState]); // Обновление списка уведомлений, чтобы новые уведомления отображались в начале списка
            }
        };
        return () => {
            eventSource.close();
        };
    }, [professionalId]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/notifications/all/${professionalId}`)
            .then((response) => {
                setNotifications(response.data);
            });
    }, [professionalId]);

    return (
        <div>
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={unreadNotificationsCount} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div>
                    {notifications.map((notification, index) => (
                        notification.messages &&
                        notification.messages.length > 0 && (
                            <div key={index}>
                                {notification.messages.map((message) => (
                                    <div key={message._id}>{message.text}</div>
                                ))}
                            </div>
                        )
                    ))}
                </div>
            </Popover>
        </div>
    );
};

export default NotificationPopover;
