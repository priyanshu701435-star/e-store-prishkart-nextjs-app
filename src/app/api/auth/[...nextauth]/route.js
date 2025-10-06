import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john.doe@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (credentials.email === "user@example.com" && credentials.password === "password") {
          return { id: "1", name: "J Smith", email: "user@example.com" }
        } else {
          return null
        }
      }
    })
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };