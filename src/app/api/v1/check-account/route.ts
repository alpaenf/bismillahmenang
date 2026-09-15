import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const target = searchParams.get('target');

    if (!target || !target.trim()) {
      return NextResponse.json(
        { error: 'Nomor rekening atau nomor telepon wajib diisi.' },
        { status: 400 }
      );
    }

    // Sanitasi: hilangkan spasi, strip, dan karakter non-alfanumerik
    const cleanTarget = target.replace(/[^0-9a-zA-Z]/g, '').trim();

    if (cleanTarget.length < 5) {
      return NextResponse.json(
        { error: 'Masukkan minimal 5 digit angka atau karakter yang valid.' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { data: reports, error } = await supabase
      .from('reported_scams')
      .select('id, scam_type, target_value, description, status, upvote_count, created_at')
      .ilike('target_value', `%${cleanTarget}%`);

    if (error) {
      console.error('Check account error:', error);
      return NextResponse.json(
        { error: 'Gagal memeriksa data pada database.' },
        { status: 500 }
      );
    }

    const count = reports ? reports.length : 0;
    const isSuspicious = count > 0;

    return NextResponse.json({
      target: cleanTarget,
      isSuspicious,
      reportCount: count,
      records: reports || [],
    });
  } catch (error) {
    console.error('Check account API error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat memproses pemeriksaan.' },
      { status: 500 }
    );
  }
}
