type AnalyticsMeta = Record<string, string | number | boolean>;

export function enableAnalytics(): Promise<void> {
    return Promise.resolve();
}

export function trackEvent(event: string, meta?: AnalyticsMeta) {
    void event;
    void meta;
}

export function getAnalyticsConsent(): boolean {
    return false;
}

export function revokeAnalyticsConsent() {
    localStorage.removeItem('citybikes_analytics_consent');
}
