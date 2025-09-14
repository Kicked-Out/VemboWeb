import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function InsightPrimaryButton() {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/get-insight");
    };

    return <Button className="insight-primary-btn" title="Level Up With Insight" onClick={onClickHandler} />;
}
