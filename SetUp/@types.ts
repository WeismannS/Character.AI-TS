export interface Character {
    external_id: string;
    title: string;
    name: string;
    visibility: string;
    copyable: boolean;
    greeting: string;
    description: string;
    identifier: string;
    avatar_file_name: string;
    songs: any[];
    img_gen_enabled: boolean;
    base_img_prompt: string;
    img_prompt_regex: string;
    strip_img_prompt_from_msg: boolean;
    user__username: string;
    participant__name: string;
    participant__num_interactions: number;
    participant__user__username: string;
    voice_id: string;
    usage: string;
}

interface Account {
    name: string;
    avatar_type: string;
    onboarding_complete: boolean;
    avatar_file_name: string;
}

interface User2 {
    username: string;
    id: number;
    first_name: string;
    account: Account;
    is_staff: boolean;
}

export interface User {
    user: User2;
    is_human: boolean;
    name: string;
    hidden_characters: any[];
    blocked_users: any[];
}

export interface search {
    title: string;
    description: string;
    avatar_file_name: string;
    external_id: string;
    participant__name: string;
    search_score: number;
    greeting: string;

    user__username : string
}