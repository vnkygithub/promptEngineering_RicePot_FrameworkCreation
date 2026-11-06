import { Credentials } from '../config/env';

export interface InvalidLoginCase {
  readonly id: string;
  readonly title: string;
  readonly credentials: Credentials;
}

export const invalidLoginCases: readonly InvalidLoginCase[] = [
  {
    id: 'TC_LOGIN_INVALID_01',
    title: 'Empty email address and empty password',
    credentials: { email: '', password: '' },
  },
  {
    id: 'TC_LOGIN_INVALID_02',
    title: 'Malformed email address and password',
    credentials: { email: 'invalid-email-format', password: 'Wrong@Pass123' },
  },
  {
    id: 'TC_LOGIN_INVALID_03',
    title: 'Unregistered email address and wrong password',
    credentials: { email: 'unregistered.user.qa@example.com', password: 'Wrong@Pass123' },
  },
  {
    id: 'TC_LOGIN_INVALID_04',
    title: 'Valid-format email address and empty password',
    credentials: { email: 'unregistered.user.qa@example.com', password: '' },
  },
  {
    id: 'TC_LOGIN_INVALID_05',
    title: 'Empty email address and non-empty password',
    credentials: { email: '', password: 'Wrong@Pass123' },
  },
  {
    id: 'TC_LOGIN_INVALID_06',
    title: 'SQL injection payload in email address and password',
    credentials: { email: "' OR '1'='1", password: "' OR '1'='1" },
  },
];
