import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const NotFoundPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className='' style={{marginTop:"3rem"}}>
            <Result
            status="404"
            title="404"
            subTitle={t("Sorry, the page you visited does not exist.")}
            extra={<Button onClick={() => navigate('/dashboard')} type="primary">{t("Go Back Home")}</Button>}
        />
        </div>
    )
}
export default NotFoundPage;