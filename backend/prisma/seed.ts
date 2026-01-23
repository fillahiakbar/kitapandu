import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { adapter } from "../src/helper/adapter"
import bcrypt from "bcrypt"

const prisma = new PrismaClient({ adapter })

async function main() {
    console.log("🌱 Seeding database...")

    const passwordHash = await bcrypt.hash("password123", 10)

    // ======================
    // Users
    // ======================

    await prisma.user.upsert({
        where: { email: "admin@kitapandu.com" },
        update: {},
        create: {
            email: "admin@kitapandu.com",
            name: "System Admin",
            password: passwordHash,
            role: "admin",
        },
    })

    // OPERATOR 1
    await prisma.user.upsert({
        where: { email: "operator1@kitapandu.com" },
        update: {},
        create: {
            email: "operator1@kitapandu.com",
            name: "Operator One",
            password: passwordHash,
            role: "operator",
        },
    })

    // OPERATOR 2
    await prisma.user.upsert({
        where: { email: "operator2@kitapandu.com" },
        update: {},
        create: {
            email: "operator2@kitapandu.com",
            name: "Operator Two",
            password: passwordHash,
            role: "operator",
        },
    })

    // ======================
    // ANNOUNCEMENTS
    // ======================
    await prisma.announcements.createMany({
        data: [
            {
                title: "Libur Nasional",
                category: "libur",
                content: "Sekolah libur pada tanggal merah nasional.",
            },
            {
                title: "Jadwal Baru",
                category: "jadwal",
                content: "Jadwal kelas telah diperbarui.",
            },
        ],
    })

    // ======================
    // PROGRAMS
    // ======================
    const program = await prisma.programs.create({
        data: {
            name: "Tahfidz Anak",
            description: "Program hafalan Al-Qur'an untuk anak-anak",
            icon: "quran",
            image: "program.jpg",
        },
    })

    // ======================
    // MENTORS
    // ======================
    const mentor = await prisma.mentors.create({
        data: {
            name: "Ustadz Ahmad",
            contact: "08123456789",
        },
    })

    // ======================
    // CLASSES
    // ======================
    const kelas = await prisma.classes.create({
        data: {
            program_id: program.program_id,
            mentor_id: mentor.mentor_id,
            name: "Tahfidz A",
            age_range: "7-10",
            period: "2025",
            status: "active",
            image: "class.jpg",
        },
    })

    // ======================
    // SCHEDULES
    // ======================
    await prisma.schedules.createMany({
        data: [
            {
                class_id: kelas.class_id,
                date: new Date("2025-01-10"),
            },
            {
                class_id: kelas.class_id,
                date: new Date("2025-01-17"),
            },
        ],
    })

    // ======================
    // STUDENTS
    // ======================
    const student = await prisma.students.create({
        data: {
            student_name: "Ali",
            student_age: 8,
            parent_name: "Bapak Ali",
            whatsapp: "08129876543",
        },
    })

    // ======================
    // ENROLLMENTS
    // ======================
    await prisma.enrollments.create({
        data: {
            student_id: student.student_id,
            class_id: kelas.class_id,
            status: "active",
            register_at: new Date(),
            confirmed_at: new Date(),
            started_at: new Date(),
            ended_at: new Date("2025-12-31"),
        },
    })

    // ======================
    // DONATIONS
    // ======================
    const donation = await prisma.donation.create({
        data: {
            title: "Donasi Renovasi Masjid",
            status: "open",
            target_amount: 10000000,
            collected_amount: 2500000,
            percent: 25,
            google_form_url: "https://forms.gle/example",
            start_date: new Date("2025-01-01"),
            end_date: new Date("2025-03-01"),
        },
    })

    // ======================
    // DONATION ALLOCATION
    // ======================
    await prisma.donationAllocation.createMany({
        data: [
            {
                donation_id: donation.donation_id,
                title: "Material Bangunan",
                amount: 1500000,
                percent: 60,
            },
            {
                donation_id: donation.donation_id,
                title: "Upah Tukang",
                amount: 1000000,
                percent: 40,
            },
        ],
    })

    console.log("✅ Seeding finished")
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
