import * as adminRepository from "@/lib/repositories/admins.repository"

export async function checkIsAdmin(userId: string): Promise<boolean> {
    return adminRepository.isUserAdmin(userId)
}