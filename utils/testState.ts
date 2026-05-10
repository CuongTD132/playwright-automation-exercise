import * as fs from 'fs';
import * as path from 'path';

const STATE_FILE = path.join(__dirname, '../test-data/.test-state.json');

export function saveTestUser(email: string, password: string, name: string) {
    fs.writeFileSync(STATE_FILE, JSON.stringify({ email, password, name }));
}

export function loadTestUser(): { email: string; password: string; name: string } {
    const raw = fs.readFileSync(STATE_FILE, 'utf-8');
    return JSON.parse(raw);
}