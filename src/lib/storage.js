// In-memory storage for demo purposes
// In production, use a real database
let subscribers = [];

export const storage = {
    addSubscriber: (email) => {
        const exists = subscribers.some(
            (sub) => sub.email.toLowerCase() === email.toLowerCase()
        );

        if (exists) {
            return {
                success: false,
                message: "Email already registered!"
            };
        }

        subscribers.push({
            email: email.toLowerCase(),
            timestamp: new Date().toISOString(),
            id: Date.now(),
        });

        return {
            success: true,
            message: "Successfully registered!"
        };
    },

    getStats: () => {
        const today = new Date();
        return {
            totalSubscribers: subscribers.length,
            recentSignups: subscribers.slice(-5).reverse(),
            todayCount: subscribers.filter((sub) => {
                const subDate = new Date(sub.timestamp);
                return subDate.toDateString() === today.toDateString();
            }).length,
        };
    },

    getAllSubscribers: () => subscribers,
};