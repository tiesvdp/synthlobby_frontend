import DefaultLayout from "@/layouts/default";
import React, { FunctionComponent } from "react";

const PrivacyPolicyPage: FunctionComponent = () => {
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-4 pb-2 border-b border-gray-200">
      {children}
    </h2>
  );

  const SubTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
      {children}
    </h3>
  );

  const P = ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
  );

  const UL = ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 pl-4">{children}</ul>
  );

  const LI = ({ children }: { children: React.ReactNode }) => (
    <li className="text-gray-600 leading-relaxed">{children}</li>
  );

  const A = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
    >
      {children}
    </a>
  );

  return (
    <DefaultLayout>
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Last Updated: August 26, 2025
          </p>

          <div className="mt-8 text-lg text-start text-gray-600">
            <P>
              Hey, I'm Ties, the creator of SynthLobby. This Privacy Policy
              explains how I collect, use, and handle your information when you
              use the SynthLobby website (the "Service"). My goal is to be as
              transparent as possible and to treat your data with the respect it
              deserves.
            </P>
          </div>

          <div className="mt-8">
            <SectionTitle>1. Information We Collect</SectionTitle>
            <P>
              To provide you with a personalized experience, we need to collect
              a small amount of information.
            </P>

            <SubTitle>Information You Provide to Us:</SubTitle>
            <UL>
              <LI>
                <strong>Account Information:</strong> When you create an
                account, we collect your <strong>email address</strong> and a{" "}
                <strong>password</strong>. You also have the option to provide a{" "}
                <strong>display name</strong>.
              </LI>
              <LI>
                <strong>Google Sign-In:</strong> If you choose to register or
                log in using your Google account, we receive your{" "}
                <strong>name</strong> and <strong>email address</strong> from
                Google to create your SynthLobby account. We do not receive your
                Google password.
              </LI>
              <LI>
                <strong>User Content:</strong> We store the lists of
                synthesizers you create, specifically your{" "}
                <strong>"Wishlist"</strong> (liked synths) and your{" "}
                <strong>"Compare List."</strong> We also store your preference
                for whether you want to receive email notifications for each
                synth on your Wishlist.
              </LI>
            </UL>

            <SectionTitle>2. How We Use Your Information</SectionTitle>
            <P>
              We use the information we collect for a few specific purposes, all
              aimed at making the Service better and more useful for you:
            </P>
            <UL>
              <LI>
                <strong>To Provide and Maintain the Service:</strong> Your
                account information allows us to create and secure your account,
                and to save your personalized lists so you can access them
                anytime you log in.
              </LI>
              <LI>
                <strong>To Personalize Your Experience:</strong> We use your
                display name to greet you and your saved lists to populate your
                personal Dashboard and Comparison pages.
              </LI>
              <LI>
                <strong>To Communicate With You:</strong> If you opt-in, we will
                use your email address to send you notifications about
                significant price drops for synths on your Wishlist. We will not
                send you marketing emails.
              </LI>
              <LI>
                <strong>To Improve the Service:</strong> Understanding which
                features are used helps us focus our efforts on making
                SynthLobby better.
              </LI>
            </UL>

            <SectionTitle>
              3. How We Share and Store Your Information
            </SectionTitle>
            <P>
              Your trust is important, and we do not sell your personal data to
              third parties.
            </P>
            <UL>
              <LI>
                <strong>Third-Party Services:</strong> SynthLobby is built using
                Google's Firebase platform for authentication (Firebase
                Authentication) and data storage (Firestore). This means your
                account data (email, password, user lists) is stored securely on
                Google's servers. By using our Service, you agree to this data
                processing by Google. You can learn more by reading{" "}
                <A href="https://policies.google.com/privacy">
                  Google's Privacy Policy
                </A>
                .
              </LI>
              <LI>
                <strong>Security:</strong> We rely on Firebase's robust security
                measures to protect your information from unauthorized access.
              </LI>
            </UL>

            <SectionTitle>4. Your Data Rights (GDPR)</SectionTitle>
            <P>
              If you are a resident of the European Economic Area (EEA), you
              have certain data protection rights. We aim to take reasonable
              steps to allow you to correct, amend, delete, or limit the use of
              your Personal Data.
            </P>
            <UL>
              <LI>
                <strong>Access and Update:</strong> You can access and update
                your display name at any time. You can view and manage your
                Wishlist and Compare List directly on your Dashboard and
                Comparison pages.
              </LI>
              <LI>
                <strong>Rectification:</strong> You have the right to have your
                information rectified if that information is inaccurate or
                incomplete.
              </LI>
              <LI>
                <strong>Erasure (Right to be Forgotten):</strong> You have the
                right to request the deletion of your account and all associated
                personal data. To do so, please contact us at the email address
                below.
              </LI>
            </UL>

            <SectionTitle>5. Changes to This Privacy Policy</SectionTitle>
            <P>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date at the top.
            </P>

            <SectionTitle>6. Contact Us</SectionTitle>
            <P>
              If you have any questions about this Privacy Policy, please
              contact me at:
            </P>
            <P>
              <A href="mailto:hello@tiesvdp.be">hello@tiesvdp.be</A>
            </P>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PrivacyPolicyPage;
