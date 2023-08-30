import React from "react";

const FrameItem: React.FC<{ path: string, title: string }> = ({ path, title }) => {

    return (
        <iframe src={path} title={path} width='100%' height='100%'>
            Здесь должен быть {title}, но ваш браузер не поддерживает плавающие фреймы. Попробуйте запустить страницу в другом браузере.
        </iframe>
    )
}

export default FrameItem;