import Link from "next/link";
import { TermsAndConditionsStyles } from "./styles/TermsAndConditionsStyles";
import { useTranslation } from "next-i18next";
const CommunityGuidelines = () => {
  const { t } = useTranslation();
  return (
    <TermsAndConditionsStyles>
      <h1>Community Guidelines</h1>
      <p className="only-english">{t("onlyEnglish")}</p>
      <p>Last updated: 10/04/2024</p>
      <p>
        We want dekitabi to be a fun and safe place for travelers and guides to
        exchange information about Japan. Help us foster this community. Post
        only respectful comments and always follow the law. Respect everyone on
        dekitabi, don’t spam people or create an unpleasant environment for the
        users.
      </p>{" "}
      <p>
        dekitabi is a reflection of our community. We’ve spent a lot of time
        thinking about the different points of view that create a safe and open
        environment for everyone. We value the freedom of the users to comment
        their point of views, customize their profile, create itineraries and
        share them without restrictions and we ask your help and cooperation to
        keep it that way.
      </p>{" "}
      <p>
        We created the Community Guidelines so you can help us foster and
        protect this community. By using dekitabi, you agree to these guidelines
        and our{" "}
        <Link href="/terms-and-conditions" prefetch={false}>
          Terms and Conditions
        </Link>
        . We’re committed to these guidelines and we hope you are too.
        Overstepping these boundaries may result in deleted content, accounts,
        or other restrictions.
      </p>{" "}
      <ul>
        <li>
          Share only photos in your profile related to you, Japan and/or your
          travel experiences.
        </li>
        <li>Post photos that are appropriate for a diverse audience.</li>
        <li>
          Foster meaningful and genuine interactions. Help us stay spam-free by
          not artificially collecting likes or shares, posting repetitive
          comments, itineraries or content. Don’t try to book guides through
          comments. Don’t post content that engages in, promotes, encourages,
          facilitates, or admits to the offering, solicitation or trade of fake
          and misleading user reviews or ratings. Don&apos;t impersonate others
          and don&apos;t create accounts for the purpose of violating our
          guidelines or misleading others.
        </li>
        <li>
          Don’t copy itineraries created by others. You are welcome to use other
          travelers and guides&apos; itineraries to book a guide with us. But
          don’t copy users’ itineraries and share them in our list as your own.
        </li>
        <li>
          Don’t use the comments to promote establishments, products, etc.
        </li>
        <li>
          Follow the law. dekitabi is not a place to support or praise
          terrorism, organized crime, or hate groups. We also remove content
          that attempts to trade, promote, co-ordinate the trade of, donate,
          gift, or ask for any type of item.
        </li>{" "}
        <li>
          Respect other users. We want to foster a positive community. We remove
          content that contains credible threats or hate speech, content that
          targets private individuals to degrade or shame them and repeated
          unwanted comments. It&apos;s never OK to encourage violence or attack
          anyone based on their race, ethnicity, national origin, sex, gender,
          gender identity, sexual orientation, religious affiliation,
          disabilities, or diseases.
        </li>
      </ul>{" "}
      <p>Help us keep the community strong:</p>{" "}
      <ul>
        <li>
          Each of us is an important part of the dekitabi community. If you see
          something that you think may violate our guidelines, please help us by
          using our built-in reporting option next to the comment. We have a
          team that reviews these reports and works as quickly as possible to
          remove content that doesn’t meet our guidelines.
        </li>
        <li>
          Many disputes and misunderstandings can be resolved directly between
          members of the community. If one of your itineraries was shared by
          someone else, you could try commenting on the itinerary and asking the
          person to take it down. If that doesn’t work, you can contact us.
        </li>
      </ul>{" "}
      <p>
        For more information, check out our{" "}
        <Link href="/terms-and-conditions" prefetch={false}>
          Terms and Conditions
        </Link>
        .
      </p>{" "}
      <p>
        Thank you for helping us create a healthy community to share our
        experiences and thoughts on how to make the best of a trip to Japan,
        <br /> dekitabi
      </p>
    </TermsAndConditionsStyles>
  );
};
export default CommunityGuidelines;
