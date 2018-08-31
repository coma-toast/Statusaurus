// https://api.slack.com/web#methods
var slack = {
    message: function(channel, message, emoji) {
        emoji = emoji || ':cx:';

        var username = 'CXI DITL Bot';

        var url = '/chat.postMessage';

        var data = {
            channel:    channel,
            text:       message,
            username:   username,
            icon_emoji: emoji,
        };

        return slack.call({
            url:  url,
            data: data,
        });
    },
    call: function(config) {
        if (typeof config === 'undefined') {
            config = {};
        }

        if (typeof config.url === 'undefined') {
            // console.error('url must be set');
            return;
        }

        if (typeof config.data === 'undefined') {
            config.data = {};
        }

        config.data.token = slackToken;

        $.ajax({
            method:      config.method || 'GET',
            url:         'https://slack.com/api' + config.url,
            data:        config.data,
            contentType: 'application/x-www-form-urlencoded',
            charset:     'utf-8'
            success:     config.success,
            error:       config.error,
            complete:    config.complete,
        });
    },
    status: function(config) {
        // save this as a POST function
        if (typeof config === 'undefined') {
            config = {};
        }

        if (typeof config.url === 'undefined') {
            // console.error('url must be set');
            return;
        }

        if (typeof config.data === 'undefined') {
            config.data = {};
        }

        config.data.token = slackToken;
        config.data = JSON.stringify(config.data)

        $.ajax({
            method:      config.method || 'GET',
            url:         'https://slack.com/api' + config.url,
            data:        config.data,
            contentType: config.contentType || 'application/x-www-form-urlencoded',
            // profile:     config.data.profile,
            status_text: config.status_text,
            status_emoji:config.status_emoji,
            success:     config.success,
            error:       config.error,
            complete:    config.complete,
            beforeSend:  function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + slackToken);
            },

        });
    },
};
