const { createUniversity } = require('./models/universityStore');
const { createUser, updateUserRole, getUserByEmail } = require('./models/userStore');

async function seedData() {
    console.log("Začenjam inicializacijo baze...");
    try {
        const Univerze = ['Univerza v Ljubljani', 'Univerza v Mariboru', 'Univerza na Primorskem'];
        for (const ime of Univerze) {
            await createUniversity(ime);
        }
        const adminEmail = 'admin@studyhub.si';
        let user = await getUserByEmail(adminEmail);
        if (!user) {
            await createUser(adminEmail, 'admin123', 1);
            user = await getUserByEmail(adminEmail);
        }
        if (user) {
            await updateUserRole(user.id, 'admin');
            console.log("Administrator je pripravljen.");
        }
    } catch (error) {
        console.error("Napaka pri inicializaciji:", error);
    }
}

module.exports = seedData;