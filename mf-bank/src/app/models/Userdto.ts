import { Role } from './Role';

export interface Userdto {
    userName?: string;
    password?: string;
    nom?: string;
    username?: string;
    prenom?: string;
    cin?: number;
    email?: string;
    dateNaissance?: Date;
    numTelcin?: number;
    role?: Role  ;
}

