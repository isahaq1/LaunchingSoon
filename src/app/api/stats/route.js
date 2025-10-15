import {
    storage
} from "@/lib/storage";
import {
    NextResponse
} from "next/server";

export async function GET() {
    try {
        const stats = storage.getStats();
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({
            totalSubscribers: 0,
            recentSignups: [],
            todayCount: 0,
        }, {
            status: 500,
        });
    }
}