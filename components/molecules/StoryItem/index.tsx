interface StoryItemProps {
    desc1: string
    desc2: string
    desc3: string
    desc4: string
    desc5: string
    button: string
}

export default function StoryItem(props: StoryItemProps) {
    const { desc1, desc2, desc3, desc4, desc5, button } = props;
    return (
        <div className="col-lg-5 col-12 ps-lg-60">
            <div className="">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">{desc1}<br /> {desc2}
                </h2>
                <p className="text-lg color-palette-1 mb-30">{desc3}<br
                    className="d-sm-block d-none" />
                    {desc4}<br className="d-sm-block d-none" />{desc5}</p>
                <div className="d-md-block d-flex flex-column w-100">
                    <a className="btn btn-read text-lg rounded-pill" href="#" role="button">{button}</a>
                </div>
            </div>
        </div>
    )
}
