// // // 'use server';

// // // import { checkUser } from "@/lib/checkUser";

// // // export async function getVdoCipherUploadCredentials(title) {
// // //     const user = await checkUser();
// // //     if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

// // //     const apiKey = process.env.VDOCIPHER_API_SECRET;

// // //     if (!apiKey) {
// // //         console.error("CRITICAL: VDOCIPHER_API_SECRET is missing from your .env file.");
// // //         throw new Error("Server configuration error: Missing API Key.");
// // //     }

// // //     const safeTitle = title && title.trim() !== "" ? title.trim() : "Untitled Video";

// // //     try {
// // //         // CORRECTED: The actual VdoCipher API endpoint for getting an upload ticket
// // //         const response = await fetch(`https://dev.vdocipher.com/api/videos?title=${encodeURIComponent(safeTitle)}`, {
// // //             method: "PUT",
// // //             headers: {
// // //                 "Authorization": `Apisecret ${apiKey}`
// // //             }
// // //         });

// // //         if (!response.ok) {
// // //             const errorText = await response.text();
// // //             console.error("VDOCIPHER API REJECTED THE REQUEST:");
// // //             console.error("Status Code:", response.status);
// // //             console.error("Error Details:", errorText);
// // //             throw new Error(`VdoCipher Error: ${response.status} - Check your VS Code Terminal for details.`);
// // //         }

// // //         const data = await response.json();

// // //         return {
// // //             clientPayload: data.clientPayload,
// // //             videoId: data.videoId
// // //         };
// // //     } catch (error) {
// // //         console.error("VdoCipher Fetch Exception:", error);
// // //         throw new Error("Failed to communicate with VdoCipher servers.");
// // //     }
// // // }

// // // export async function getVdoCipherOTP(videoId) {
// // //     const user = await checkUser();
// // //     if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

// // //     const apiKey = process.env.VDOCIPHER_API_SECRET;

// // //     try {
// // //         const response = await fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
// // //             method: "POST",
// // //             headers: {
// // //                 "Accept": "application/json",
// // //                 "Content-Type": "application/json",
// // //                 "Authorization": `Apisecret ${apiKey}`
// // //             },
// // //             body: JSON.stringify({
// // //                 ttl: 3600, // Valid for 1 hour
// // //                 annotate: JSON.stringify([
// // //                     {
// // //                         type: 'rtext',
// // //                         text: user.email,
// // //                         alpha: '0.6',
// // //                         color: '0xFFFFFF',
// // //                         size: '15',
// // //                         interval: '5000'
// // //                     }
// // //                 ])
// // //             })
// // //         });

// // //         if (!response.ok) throw new Error("Failed to fetch OTP");

// // //         return await response.json();
// // //     } catch (error) {
// // //         console.error("OTP Error:", error);
// // //         throw new Error("Could not start video playback.");
// // //     }
// // // }

// // 'use server';

// // import { checkUser } from "@/lib/checkUser";

// // /**
// //  * GET UPLOAD CREDENTIALS
// //  * Uses the 'dev' domain for importing/uploading videos
// //  */
// // export async function getVdoCipherUploadCredentials(title) {
// //     const user = await checkUser();
// //     if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

// //     const apiKey = process.env.VDOCIPHER_API_SECRET;
// //     if (!apiKey) {
// //         console.error("CRITICAL: VDOCIPHER_API_SECRET is missing from .env");
// //         throw new Error("Server configuration error.");
// //     }

// //     const safeTitle = title?.trim() || "Untitled Video";

// //     try {
// //         const response = await fetch(`https://dev.vdocipher.com/api/videos?title=${encodeURIComponent(safeTitle)}`, {
// //             method: "PUT",
// //             headers: {
// //                 "Authorization": `Apisecret ${apiKey}`
// //             }
// //         });

// //         if (!response.ok) {
// //             const errorText = await response.text();
// //             console.error("VdoCipher Upload Auth Error:", errorText);
// //             throw new Error(`Upload Auth Failed: ${response.status}`);
// //         }

// //         const data = await response.json();
// //         return {
// //             clientPayload: data.clientPayload,
// //             videoId: data.videoId
// //         };
// //     } catch (error) {
// //         console.error("VdoCipher Import Exception:", error);
// //         throw new Error("Failed to connect to VdoCipher for upload.");
// //     }
// // }

// // /**
// //  * GET PLAYBACK OTP
// //  * Uses the 'api' domain for playback authorization
// //  */
// // export async function getVdoCipherOTP(videoId) {
// //     const user = await checkUser();
// //     if (!user) throw new Error("Unauthorized");

// //     const apiKey = process.env.VDOCIPHER_API_SECRET;

// //     try {
// //         // Playback uses api.vdocipher.com, not dev.vdocipher.com
// //         const response = await fetch(`https://api.vdocipher.com/v2/videos/${videoId}/otp`, {
// //             method: "POST",
// //             headers: {
// //                 "Accept": "application/json",
// //                 "Content-Type": "application/json",
// //                 "Authorization": `Apisecret ${apiKey}`
// //             },
// //             body: JSON.stringify({
// //                 ttl: 3600,
// //                 annotate: JSON.stringify([
// //                     {
// //                         type: 'rtext',
// //                         text: user.email,
// //                         alpha: '0.6',
// //                         color: '0xFFFFFF',
// //                         size: '15',
// //                         interval: '5000'
// //                     }
// //                 ])
// //             })
// //         });

// //         if (!response.ok) {
// //             const errorData = await response.json();
// //             console.error("VdoCipher OTP REJECTION:", errorData);
// //             throw new Error(errorData.message || "Failed to fetch OTP");
// //         }

// //         return await response.json();
// //     } catch (error) {
// //         console.error("OTP Server Error:", error);
// //         throw new Error("Could not start video playback. The video might still be processing.");
// //     }
// // }




// 'use server';

// import { checkUser } from "@/lib/checkUser";

// /**
//  * 1. GET UPLOAD CREDENTIALS
//  * This uses the 'dev' domain to get the AWS S3 upload ticket.
//  */
// export async function getVdoCipherUploadCredentials(title) {
//     const user = await checkUser();
//     if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

//     const apiKey = process.env.VDOCIPHER_API_SECRET;
//     if (!apiKey) throw new Error("Missing VDOCIPHER_API_SECRET in .env");

//     const safeTitle = title?.trim() || "Untitled Video";

//     try {
//         const response = await fetch(`https://dev.vdocipher.com/api/videos?title=${encodeURIComponent(safeTitle)}`, {
//             method: "PUT",
//             headers: {
//                 "Authorization": `Apisecret ${apiKey}`
//             }
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("VdoCipher Upload Auth Error:", errorText);
//             throw new Error(`Upload Auth Failed: ${response.status}`);
//         }

//         const data = await response.json();
//         return {
//             clientPayload: data.clientPayload,
//             videoId: data.videoId
//         };
//     } catch (error) {
//         console.error("VdoCipher Import Exception:", error);
//         throw new Error("Failed to connect to VdoCipher for upload.");
//     }
// }

// /**
//  * 2. GET PLAYBACK OTP (Corrected for V2 API)
//  * This uses the 'api' domain for secure playback.
//  */
// export async function getVdoCipherOTP(videoId) {
//     const user = await checkUser();
//     if (!user) throw new Error("Unauthorized");

//     const apiKey = process.env.VDOCIPHER_API_SECRET;

//     try {
//         // FIXED URL: The correct V2 path is /v2/otp/{videoId}
//         const response = await fetch(`https://api.vdocipher.com/v2/otp/${videoId}`, {
//             method: "POST",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json",
//                 "Authorization": `Apisecret ${apiKey}`
//             },
//             body: JSON.stringify({
//                 ttl: 3600,
//                 annotate: JSON.stringify([
//                     {
//                         type: 'rtext',
//                         text: user.email,
//                         alpha: '0.6',
//                         color: '0xFFFFFF',
//                         size: '15',
//                         interval: '5000'
//                     }
//                 ])
//             })
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("VdoCipher OTP REJECTION:", errorData);
//             throw new Error(errorData.message || "Failed to fetch OTP");
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("OTP Server Error:", error);
//         throw new Error("Could not start video playback. The video might still be processing.");
//     }
// }


'use server';

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

/**
 * 1. GET UPLOAD CREDENTIALS
 * Domain: dev.vdocipher.com
 */
export async function getVdoCipherUploadCredentials(title) {
    const user = await checkUser();
    if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

    const apiKey = process.env.VDOCIPHER_API_SECRET;
    if (!apiKey) throw new Error("Missing VDOCIPHER_API_SECRET in .env");

    const safeTitle = title?.trim() || "Untitled Video";

    try {
        const response = await fetch(`https://dev.vdocipher.com/api/videos?title=${encodeURIComponent(safeTitle)}`, {
            method: "PUT",
            headers: {
                "Authorization": `Apisecret ${apiKey}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("VdoCipher Upload Auth Error:", errorText);
            throw new Error(`Upload Auth Failed: ${response.status}`);
        }

        const data = await response.json();
        return {
            clientPayload: data.clientPayload,
            videoId: data.videoId
        };
    } catch (error) {
        console.error("VdoCipher Import Exception:", error);
        throw new Error("Failed to connect to VdoCipher for upload.");
    }
}

/**
 * 2. GET PLAYBACK OTP (Corrected for V2 API and 400 Error)
 * Domain: api.vdocipher.com
 */
export async function getVdoCipherOTP(videoId) {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const apiKey = process.env.VDOCIPHER_API_SECRET;

    try {
        // VdoCipher requires the annotation to be a stringified array of objects
        const annotationConfig = [
            {
                type: 'rtext',
                text: user.email,
                alpha: '0.6',
                color: '0xFFFFFF',
                size: '15',
                interval: '5000'
            }
        ];

        const response = await fetch(`https://api.vdocipher.com/v2/otp/${videoId}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Apisecret ${apiKey}`
            },
            body: JSON.stringify({
                ttl: 3600,
                annotate: JSON.stringify(annotationConfig) // Double stringify is required by VdoCipher
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("VdoCipher OTP REJECTION:", errorData);

            // Handle the "Processing" state specifically
            if (response.status === 404 || errorData.message?.includes("processing")) {
                throw new Error("PROCESSING");
            }

            throw new Error(errorData.message || "Failed to fetch OTP");
        }

        return await response.json();
    } catch (error) {
        console.error("OTP Server Error:", error);
        if (error.message === "PROCESSING") {
            throw new Error("Video is still being processed and encrypted.");
        }
        throw new Error("Could not start secure playback.");
    }
}