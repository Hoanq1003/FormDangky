import { getSheetsClient } from './client';

// ============================================================
// Sheet tab names — constants
// ============================================================
const SHEET = {
    SETTINGS: 'settings',
    CATEGORIES: 'categories',
    SUBMISSIONS: 'submissions',
    SUBMISSION_ITEMS: 'submission_items',
    AUDIT_LOGS: 'audit_logs',
} as const;

// ============================================================
// Low-level helpers
// ============================================================

async function appendRows(sheetName: string, rows: string[][]) {
    const { sheets, spreadsheetId } = await getSheetsClient();
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: rows },
    });
}

async function readRows(sheetName: string): Promise<string[][]> {
    const { sheets, spreadsheetId } = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A:Z`,
    });
    return (res.data.values as string[][]) || [];
}

// ============================================================
// Submission helpers
// ============================================================

export async function appendSubmission(row: string[]) {
    await appendRows(SHEET.SUBMISSIONS, [row]);
}

export async function appendSubmissionItems(rows: string[][]) {
    await appendRows(SHEET.SUBMISSION_ITEMS, rows);
}

export async function appendAuditLog(row: string[]) {
    await appendRows(SHEET.AUDIT_LOGS, [row]);
}

// ============================================================
// Read helpers (admin)
// ============================================================

export async function listSubmissions(): Promise<Record<string, string>[]> {
    const rows = await readRows(SHEET.SUBMISSIONS);
    if (rows.length < 2) return [];
    const headers = rows[0];
    return rows.slice(1).map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => {
            obj[h] = row[i] || '';
        });
        return obj;
    });
}

export async function listSubmissionItems(): Promise<Record<string, string>[]> {
    const rows = await readRows(SHEET.SUBMISSION_ITEMS);
    if (rows.length < 2) return [];
    const headers = rows[0];
    return rows.slice(1).map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => {
            obj[h] = row[i] || '';
        });
        return obj;
    });
}

export async function getSubmissionById(submissionId: string) {
    const submissions = await listSubmissions();
    const submission = submissions.find(
        (s) => s.submission_id === submissionId || s.submission_code === submissionId
    );
    if (!submission) return null;

    const allItems = await listSubmissionItems();
    const items = allItems.filter(
        (item) => item.submission_id === submission.submission_id
    );

    return { submission, items };
}

export async function readSettings(): Promise<Record<string, string>> {
    const rows = await readRows(SHEET.SETTINGS);
    const settings: Record<string, string> = {};
    rows.slice(1).forEach((row) => {
        if (row[0]) settings[row[0]] = row[1] || '';
    });
    return settings;
}
