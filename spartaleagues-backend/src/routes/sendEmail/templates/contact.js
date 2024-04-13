export default async (name, email, message) => {
        
    let output = `
        <p>You have new contact request</p>
        <h3>Contact Detailes</h3>
        <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
    `;

    return output;
}