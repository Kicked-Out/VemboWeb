import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function InsightButton() {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("get-insight");
    };

    return <Button className="insight-btn" title="Get Insight" onClick={onClickHandler} />;
}
