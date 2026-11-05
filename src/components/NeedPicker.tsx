"use client";

import { useId, useState } from "react";
import MailLink from "./MailLink";

type Props = {
  email: string;
  legend: string;
  choices: string[];
  send: string;
  mailSubject: string;
  mailBody: string;
};

/** Choosing what you need writes the email for you; without script it is a plain mailto link. */
export default function NeedPicker({ email, legend, choices, send, mailSubject, mailBody }: Props) {
  const name = useId();
  const [picked, setPicked] = useState<string | null>(null);

  const href = picked
    ? `mailto:${email}?subject=${encodeURIComponent(mailSubject.replace("{choice}", picked))}&body=${encodeURIComponent(
        mailBody.replace("{choice}", picked),
      )}`
    : `mailto:${email}`;

  return (
    <div className="picker">
      <fieldset>
        <legend>{legend}</legend>
        <div className="picker-options">
          {choices.map((c, i) => (
            <label key={c} className="picker-option rise" style={{ "--i": i } as React.CSSProperties}>
              <input
                type="radio"
                name={name}
                value={c}
                checked={picked === c}
                onChange={() => setPicked(c)}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <MailLink className="btn btn-primary" href={href}>
        {send}
      </MailLink>
    </div>
  );
}
