async function sendGotifyNotification(title, content, config) {
  try {
    const serverUrl = (config.GOTIFY_SERVER_URL || '').trim();
    const token = (config.GOTIFY_APP_TOKEN || '').trim();

    if (!serverUrl || !token) {
      console.log('[Gotify] 未配置 GOTIFY_SERVER_URL 或 GOTIFY_APP_TOKEN');
      return false;
    }

    const url = serverUrl.replace(/\/+$/, '') + '/message?token=' + encodeURIComponent(token);

    const payload = {
      title: title || '通知',
      message: content || '',
      priority: 5
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('[Gotify] 请求失败:', response.status, text);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Gotify] 发送失败:', error);
    return false;
  }
}

export {
  sendGotifyNotification
};
