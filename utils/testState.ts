import * as fs from 'fs';
import * as path from 'path';
import { UserData } from '../test-data/users';

const STATE_FILE = path.join(__dirname, '../test-data/.test-state.json');

export function saveTestUser(user: UserData) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(user));
}

export function loadTestUser(): UserData {
    const raw = fs.readFileSync(STATE_FILE, 'utf-8');
    return JSON.parse(raw);
}