import GameItem, { GameItemProps } from "@/components/molecules/GameItem";
import { Meta, StoryFn } from "@storybook/react";

export default {
    title: 'Components/Molecules/GameItem',
    component: GameItem,
} as Meta<typeof GameItem>;

const Template: StoryFn<GameItemProps> = (args) => <GameItem {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Super Mechs',
    category: 'Mobile',
    thumbnail: '/img/Thumbnail-1.png',
};
