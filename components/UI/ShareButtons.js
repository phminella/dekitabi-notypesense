import { ShareButtonsStyles } from "./styles/ShareButtonsStyles";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LineShareButton,
  LineIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
const ShareButtons = ({ url }) => {
  return (
    <ShareButtonsStyles className="share-buttons">
      <EmailShareButton
        openShareDialogOnClick={true}
        url={url}
        subject={"dekitabi!"}
        body={"dekitabi"}
      >
        <EmailIcon size={30} style={{ borderRadius: "5px" }} />
      </EmailShareButton>
      <FacebookShareButton url={url} quote="dekitabi!" hashtag="tokyo">
        <FacebookIcon size={30} style={{ borderRadius: "5px" }} />
      </FacebookShareButton>
      <FacebookMessengerShareButton appId="599527708507140" url={url}>
        <FacebookMessengerIcon size={30} style={{ borderRadius: "5px" }} />
      </FacebookMessengerShareButton>
      <WhatsappShareButton url={url} title="dekitabi!">
        <WhatsappIcon size={30} style={{ borderRadius: "5px" }} />
      </WhatsappShareButton>
      <LineShareButton url={url} title="dekitabi!">
        <LineIcon size={30} style={{ borderRadius: "5px" }} />
      </LineShareButton>
    </ShareButtonsStyles>
  );
};
export default ShareButtons;
