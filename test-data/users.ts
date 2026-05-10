export interface UserData {
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
}

export function generateUser(): UserData {
    const timestamp = Date.now();
    return {
        name: 'Test User',
        email: `testuser_${timestamp}@mailtest.com`,
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
        company: 'QA Corp',
        address1: '123 Main Street',
        address2: 'Suite 456',
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        zipcode: '90001',
        mobileNumber: '0912345678',
        birthDay: '30',
        birthMonth: 'May',
        birthYear: '2000',
    };
}

export const INVALID_CREDENTIALS = {
    email: 'invalid_user@mailtest.com',
    wrongPassword: 'WrongPassword999!',
};

export const PAYMENT_DATA = {
    cardName: 'Test User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2027',
};