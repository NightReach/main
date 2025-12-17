export async function sendVerificationEmail(
    email: string,
    verificationUrl: string
  ) {
    console.log("📧 Verification email");
    console.log("To:", email);
    console.log("Link:", verificationUrl);
  }
  