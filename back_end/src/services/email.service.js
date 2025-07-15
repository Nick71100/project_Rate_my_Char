import resend from "../utils/resend.js";

export const sendEmailConfirmation = async (email, token) => {
  const encodedToken = encodeURIComponent(token);

  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "nick.delattre4@gmail.com",
    subject: "Confirme ton adresse email",
    html: `
            <main style="font-family: sans-serif; color: #333;">
                <h1 style="color: #007bff;">Bienvenue sur MonApp !</h1>
                <p>Merci de t'être inscrit.</p>
                <p>
                Clique ici pour valider ton email :
                <br />
                <a href="http://localhost:3000/auth/verify-email/${encodedToken}"
                    style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
                    Valider mon adresse
                </a>
                </p>
                <p style="font-size: 0.9em; color: #999;">Ce lien expire dans 1 heure.</p>
            </main>
            `,
  });

  return response;
};
