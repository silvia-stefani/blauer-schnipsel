export const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/fallback-image.jpg"; 
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${baseUrl}${imageUrl}`;
};