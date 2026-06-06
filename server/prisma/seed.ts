import { PrismaClient, Role, WorkerStatus, ZoneType, AlertType, AlertSeverity, AlertStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // ─── Clear existing data ──────────────────────────────────────────
  await prisma.alert.deleteMany();
  await prisma.location.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.zone.deleteMany();
  await prisma.worker.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleared existing data');

  // ─── Create Users ─────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('password123', 12);

  const supervisor = await prisma.user.create({
    data: {
      name: 'Rajesh Kumar',
      email: 'supervisor@trackman.com',
      passwordHash,
      role: Role.SUPERVISOR,
      phone: '+91-9876543210',
    },
  });

  const controlRoom = await prisma.user.create({
    data: {
      name: 'Control Room Admin',
      email: 'control@trackman.com',
      passwordHash,
      role: Role.CONTROL_ROOM,
      phone: '+91-9876543211',
    },
  });

  const trackmanUsers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Amit Sharma',
        email: 'amit@trackman.com',
        passwordHash,
        role: Role.TRACKMAN,
        phone: '+91-9876543212',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Vikram Singh',
        email: 'vikram@trackman.com',
        passwordHash,
        role: Role.TRACKMAN,
        phone: '+91-9876543213',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Suresh Patel',
        email: 'suresh@trackman.com',
        passwordHash,
        role: Role.TRACKMAN,
        phone: '+91-9876543214',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Manoj Yadav',
        email: 'manoj@trackman.com',
        passwordHash,
        role: Role.TRACKMAN,
        phone: '+91-9876543215',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Ravi Verma',
        email: 'ravi@trackman.com',
        passwordHash,
        role: Role.TRACKMAN,
        phone: '+91-9876543216',
      },
    }),
  ]);

  console.log(`✅ Created ${2 + trackmanUsers.length} users`);

  // ─── Create Workers ───────────────────────────────────────────────
  const workers = await Promise.all(
    trackmanUsers.map((user, index) =>
      prisma.worker.create({
        data: {
          userId: user.id,
          employeeId: `TM-${String(1001 + index).padStart(4, '0')}`,
          designation: index < 2 ? 'Senior Trackman' : 'Trackman',
          department: 'Track Maintenance',
          status: index < 3 ? WorkerStatus.ON_DUTY : WorkerStatus.OFF_DUTY,
          lastKnownLatitude: 28.6139 + (Math.random() - 0.5) * 0.02,
          lastKnownLongitude: 77.2090 + (Math.random() - 0.5) * 0.02,
          lastLocationAt: new Date(),
        },
      })
    )
  );

  console.log(`✅ Created ${workers.length} workers`);

  // ─── Create Zones ─────────────────────────────────────────────────
  const zones = await Promise.all([
    prisma.zone.create({
      data: {
        name: 'New Delhi Station - Track 3 Maintenance',
        description: 'Regular maintenance block on Track 3, Platform 5-7',
        type: ZoneType.MAINTENANCE,
        boundary: {
          type: 'Polygon',
          coordinates: [[
            [77.2185, 28.6428],
            [77.2210, 28.6428],
            [77.2210, 28.6445],
            [77.2185, 28.6445],
            [77.2185, 28.6428],
          ]],
        },
        isActive: true,
        startTime: new Date(),
        endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
        createdById: supervisor.id,
      },
    }),
    prisma.zone.create({
      data: {
        name: 'Nizamuddin Bridge - Danger Zone',
        description: 'High-speed rail crossing zone - no maintenance allowed',
        type: ZoneType.DANGER,
        boundary: {
          type: 'Polygon',
          coordinates: [[
            [77.2425, 28.5875],
            [77.2460, 28.5875],
            [77.2460, 28.5900],
            [77.2425, 28.5900],
            [77.2425, 28.5875],
          ]],
        },
        isActive: true,
        createdById: controlRoom.id,
      },
    }),
    prisma.zone.create({
      data: {
        name: 'Ghaziabad Yard - Safe Zone',
        description: 'Worker rest area and equipment storage',
        type: ZoneType.SAFE,
        boundary: {
          type: 'Polygon',
          coordinates: [[
            [77.4170, 28.6690],
            [77.4200, 28.6690],
            [77.4200, 28.6710],
            [77.4170, 28.6710],
            [77.4170, 28.6690],
          ]],
        },
        isActive: true,
        createdById: supervisor.id,
      },
    }),
  ]);

  console.log(`✅ Created ${zones.length} zones`);

  // ─── Create Sample Locations ──────────────────────────────────────
  const locationData = [];
  for (const worker of workers) {
    for (let i = 0; i < 20; i++) {
      const baseLat = worker.lastKnownLatitude || 28.6139;
      const baseLng = worker.lastKnownLongitude || 77.2090;
      locationData.push({
        workerId: worker.id,
        latitude: baseLat + (Math.random() - 0.5) * 0.005,
        longitude: baseLng + (Math.random() - 0.5) * 0.005,
        accuracy: 5 + Math.random() * 10,
        speed: Math.random() * 5,
        recordedAt: new Date(Date.now() - i * 30000), // Every 30 seconds
      });
    }
  }

  await prisma.location.createMany({ data: locationData });
  console.log(`✅ Created ${locationData.length} location records`);

  // ─── Create Sample Alerts ─────────────────────────────────────────
  const alerts = await Promise.all([
    prisma.alert.create({
      data: {
        workerId: workers[0].id,
        zoneId: zones[1].id,
        type: AlertType.ZONE_BREACH,
        severity: AlertSeverity.HIGH,
        status: AlertStatus.ACTIVE,
        message: 'Worker entered Danger Zone: Nizamuddin Bridge',
        latitude: 28.5885,
        longitude: 77.2440,
      },
    }),
    prisma.alert.create({
      data: {
        workerId: workers[1].id,
        type: AlertType.DEVICE_OFFLINE,
        severity: AlertSeverity.MEDIUM,
        status: AlertStatus.ACKNOWLEDGED,
        message: 'Worker device went offline for 10+ minutes',
        resolvedById: supervisor.id,
      },
    }),
    prisma.alert.create({
      data: {
        workerId: workers[2].id,
        type: AlertType.GEOFENCE_EXIT,
        severity: AlertSeverity.HIGH,
        status: AlertStatus.RESOLVED,
        message: 'Worker exited assigned maintenance zone',
        latitude: 28.6450,
        longitude: 77.2215,
        resolvedAt: new Date(),
        resolvedById: controlRoom.id,
      },
    }),
  ]);

  console.log(`✅ Created ${alerts.length} sample alerts`);

  // ─── Create Sample Shifts ─────────────────────────────────────────
  for (const worker of workers.slice(0, 3)) {
    await prisma.shift.create({
      data: {
        workerId: worker.id,
        zoneId: zones[0].id,
        status: 'ACTIVE',
        checkIn: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
    });
  }

  console.log('✅ Created active shifts for on-duty workers');

  // ─── Summary ──────────────────────────────────────────────────────
  console.log('\n🎉 Seed completed successfully!\n');
  console.log('📋 Login credentials (all passwords: password123):');
  console.log('   👔 Supervisor:    supervisor@trackman.com');
  console.log('   🏢 Control Room:  control@trackman.com');
  console.log('   👷 Trackman:      amit@trackman.com');
  console.log('   👷 Trackman:      vikram@trackman.com');
  console.log('   👷 Trackman:      suresh@trackman.com');
  console.log('   👷 Trackman:      manoj@trackman.com');
  console.log('   👷 Trackman:      ravi@trackman.com\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
