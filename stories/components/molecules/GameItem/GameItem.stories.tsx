import GameItem, { GameItemProps } from "@/components/molecules/GameItem";
import { Meta } from "@storybook/react";

export default {
    title: 'Components/Molecules/GameItem',
    component: GameItem,
} as Meta;

const Template = (args: GameItemProps) => <GameItem {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Super Mechs',
    categorie: 'Mobile',
    thumbnail: '/img/Thumbnail-1.png',
};