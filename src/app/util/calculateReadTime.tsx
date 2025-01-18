const WORDS_PER_MINUTE = 265;
const SECONDS_PER_IMAGE = 12;

function calculateReadTime(content: string): string {
    const stripHtml = content.replace(/<[^>]*>/g, '');
    const words = stripHtml.trim().split(/\s+/).length;
    
    const imageMatches = content.match(/<img[^>]*>/g);
    const imageCount = imageMatches ? imageMatches.length : 0;
    
    const readingTimeMinutes = words / WORDS_PER_MINUTE;
    const imageTimeMinutes = (imageCount * SECONDS_PER_IMAGE) / 60;
    const totalMinutes = Math.ceil(readingTimeMinutes + imageTimeMinutes);
    
    if (totalMinutes < 1) {
        return "< 1 min read";
    } else if (totalMinutes === 1) {
        return "1 min read";
    } else {
        return `${totalMinutes} min read`;
    }
}