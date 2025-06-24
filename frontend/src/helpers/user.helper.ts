export const generateUsername = (firstName: string, lastName: string): string => {
    // Remove accents and special characters
    const normalizedFirstName = firstName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedLastName = lastName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Convert to lowercase and replace spaces with underscores
    const username = `${normalizedFirstName.toLowerCase()}-${normalizedLastName.toLowerCase()}-${Math.floor(Math.random() * 1000)}`;

    return username;
}