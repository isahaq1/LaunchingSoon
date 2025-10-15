import {
    storage
} from "@/lib/storage";
import {
    NextResponse
} from "next/server";

export async function POST(request) {
    try {
        const {
            email
        } = await request.json();

        if (!email) {
            return NextResponse.json({
                success: false,
                message: "Email is required",
            }, {
                status: 400,
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                message: "Invalid email format",
            }, {
                status: 400,
            });
        }

        const result = storage.addSubscriber(email);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error",
        }, {
            status: 500,
        });
    }
}