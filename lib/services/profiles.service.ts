import {Profile} from "@/types/Profile"
import {toProfile} from "@/lib/mappers/profiles.mapper";
import * as profilesRepository from "@/lib/repositories/profiles.repository"
import { UpdateProfileInput } from "@/lib/validators/profiles.validator"
import {getAuthClaims} from "@/lib/auth/get-auth-claims";


export async function getProfile(userId: string): Promise<Profile | null> {
    const row = await profilesRepository.getProfileById(userId)
    return row ? toProfile(row) : null
}

export async function getCurrentProfile(): Promise<Profile | null> {
    const claims = await getAuthClaims()
    return getProfile(claims.sub)
}

export async function updateProfile(input: UpdateProfileInput): Promise<Profile> {
    const claims = await getAuthClaims()
    const row =  await profilesRepository.update(claims.sub, input)
    return toProfile(row)
}

export async function completeOnboarding(input: UpdateProfileInput): Promise<Profile> {
    const claims = await getAuthClaims()
    await profilesRepository.update(claims.sub, input)
    const row = await profilesRepository.markOnboardingCompleted(claims.sub)
    return toProfile(row)
}