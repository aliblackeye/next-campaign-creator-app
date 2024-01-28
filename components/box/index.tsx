interface IBox {
    children: React.ReactNode;
    title?: string;
    subTitle?: string;
    subTitleStatus?: "primary" | "secondary";
    className?: string;
}

export default function Box(props: IBox) {

    // Destructure props
    const { children, title, subTitle, subTitleStatus, className, } = props;


    return (
        <div
            className={`box rounded-3xl border border-gray/20 p-6 ${className}`}>
            {(title || subTitle) && (<div className="box-header mb-6">
                {title && <h4 className="text-[16px] font-normal">{title}</h4>}
                {subTitle && <h4 className={`text-[14px] font-normal ${subTitleStatus === "primary" ? "text-primary" : "text-gray"}`}>{subTitle}</h4>}
            </div>)}
            <div className="box-content">
                {children}
            </div>
        </div>
    )
}
