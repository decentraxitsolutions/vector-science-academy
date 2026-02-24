'use client';

import { useEffect, useState } from "react";
import { getVdoCipherOTP } from "@/actions/teacher/vdoCipherActions";
import { Loader2, AlertCircle } from "lucide-react";

export default function SecurePlayer({ videoId }) {
    const [playbackData, setPlaybackData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadVideo() {
            try {
                const data = await getVdoCipherOTP(videoId);
                setPlaybackData(data);
            } catch (err) {
                setError(true);
            }
        }
        loadVideo();
    }, [videoId]);

    if (error) return (
        <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center text-red-400 gap-2 border border-red-900/20">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm">Video is still processing or unauthorized.</p>
        </div>
    );

    if (!playbackData) return (
        <div className="aspect-video bg-zinc-900 rounded-xl flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
    );

    return (
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl border border-white/10">
            <iframe
                src={`https://player.vdocipher.com/v2/?otp=${playbackData.otp}&playbackInfo=${playbackData.playbackInfo}`}
                style={{ border: 0, width: "100%", height: "100%" }}
                allow="autoplay; encrypted-media"
                allowFullScreen
            ></iframe>
        </div>
    );
}