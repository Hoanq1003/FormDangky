/**
 * Generate a human-readable submission code.
 * Format: DK-YYYYMMDD-XXXX (4 random alphanumeric chars)
 */
export function generateSubmissionCode(prefix: string = 'DK'): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const rand = randomAlpha(4);
    return `${prefix}-${y}${m}${d}-${rand}`;
}

function randomAlpha(len: number): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // avoid 0/O/1/I confusion
    let result = '';
    for (let i = 0; i < len; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
