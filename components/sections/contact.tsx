"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { Contact } from "@/lib/types";

export default function ContactSection() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [memberships, setMemberships] = useState<{ organization_name: string; organization_url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      const supabase = createClient();

      try {
        // Fetch contact details from Supabase
        const { data: contactData, error: contactError } = await supabase
          .from("contact")
          .select("*")
          .single(); // Assuming one record exists
        if (contactError) throw contactError;
        setContact(contactData);

        // Fetch memberships data from Supabase
        const { data: membershipData, error: membershipError } = await supabase
          .from("memberships")
          .select("*")
          .eq("contact_id", contactData?.id); // Filter by contact_id
        if (membershipError) throw membershipError;
        setMemberships(membershipData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div >
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        <h2 className="text-lg font-bold">Connect</h2>
      </div>

      <div className="space-y-4 mt-4 ">
        {/* Email Section */}
        <a
          className="block p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-black dark:text-white hover:dark:bg-neutral-800"
          href={`mailto:${contact?.email}`}
        >
          <p className="text-xs text-foreground/70">Email</p>
          <p className="text-sm font-medium">{contact?.email}</p>
        </a>

        {/* Social Links Section */}
        <div>
          <p className="text-xs text-foreground/70 mb-2">Social Links</p>
          <div className="grid grid-cols-3 gap-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-black dark:text-white hover:dark:bg-neutral-800"
              aria-label="Visit LinkedIn profile"
              title="Visit LinkedIn profile"
              href={contact?.linkedin_url}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-black dark:text-white hover:dark:bg-neutral-800"
              aria-label="Visit GitHub profile"
              title="Visit GitHub profile"
              href={contact?.github_url}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        {/* A member of Section */}
        {memberships.length > 0 && (
          <div>
            <p className="text-xs text-foreground/70 mb-2 ">A member of</p>
            <div className="space-y-2 ">
              {memberships.map((membership, index) => (
                <a
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors group dark:bg-black dark:text-white hover:dark:bg-neutral-800"
                  href={membership.organization_url}
                >
                  <div className="flex items-center justify-between ">
                    <p className="text-[11px] font-medium leading-relaxed ">{membership.organization_name}</p>
                    <svg
                      className="w-3.5 h-3.5 text-foreground/50 transition-transform group-hover:translate-x-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
