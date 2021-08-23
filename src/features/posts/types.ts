import { RouteComponentProps } from "react-router-dom";

import {reactionEmoji} from './ReactionButtons';

export type PostType = {
    id: string;
    title: string;
    content: string;
    date: string;
    user: string;
    reactions: {
        [key in keyof typeof reactionEmoji]: number
    };
};

export type MathParamsType = {
    postId: string;
};

export type RouterParamsType = RouteComponentProps<MathParamsType>;
export type RouterUserParamsType = RouteComponentProps<{
    user: string
}>;