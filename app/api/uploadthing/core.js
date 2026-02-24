import { createUploadthing } from "uploadthing/next";
import { checkUser } from "@/lib/checkUser";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "64MB", maxFileCount: 1 } })
        .middleware(async ({ req }) => {
            console.log("[UPLOADTHING_MIDDLEWARE] Starting middleware...");
            try {
                const user = await checkUser();
                console.log("[UPLOADTHING_MIDDLEWARE] User returned from checkUser:", user?.id, "Role:", user?.role);

                if (!user) {
                    console.error("[UPLOADTHING_MIDDLEWARE] Unauthorized - No user found");
                    throw new Error("Unauthorized");
                }

                if (user.role !== "TEACHER") {
                    console.error("[UPLOADTHING_MIDDLEWARE] Unauthorized - User is not a TEACHER. Role is:", user.role);
                    throw new Error("Unauthorized");
                }

                return { userId: user.id };
            } catch (error) {
                console.error("[UPLOADTHING_MIDDLEWARE] Error in middleware:", error);
                throw error;
            }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("[UPLOADTHING_UPLOAD_COMPLETE] Upload complete for userId:", metadata.userId);
            console.log("[UPLOADTHING_UPLOAD_COMPLETE] File URL:", file.url);
            return { uploadedBy: metadata.userId, url: file.url };
        }),
};