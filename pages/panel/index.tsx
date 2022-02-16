import type { GetStaticProps, NextPage } from "next";
import { ReactElement } from "react";
import PanelLayout from "../../components/panel/panelLayout/PanelLayout";

const PanelHome = () => {
    return (
        <>
            panel home page
        </>
    )
}

PanelHome.getLayout = function getLayout(page: ReactElement) {
    return (
        <PanelLayout>
            {page}
        </PanelLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    return {
      props: {
        protected: true,
      },
    }
}

export default PanelHome