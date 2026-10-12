export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      admin_bootstrap: {
        Row: {
          consumed_at: string | null
          consumed_by: string | null
          id: boolean
          owner_email: string | null
        }
        Insert: {
          consumed_at?: string | null
          consumed_by?: string | null
          id?: boolean
          owner_email?: string | null
        }
        Update: {
          consumed_at?: string | null
          consumed_by?: string | null
          id?: boolean
          owner_email?: string | null
        }
        Relationships: []
      }
      availability_rules: {
        Row: {
          end_time: string
          id: string
          start_time: string
          weekday: number
        }
        Insert: {
          end_time: string
          id?: string
          start_time: string
          weekday: number
        }
        Update: {
          end_time?: string
          id?: string
          start_time?: string
          weekday?: number
        }
        Relationships: []
      }
      blocked_dates: {
        Row: {
          date: string
          reason: string | null
        }
        Insert: {
          date: string
          reason?: string | null
        }
        Update: {
          date?: string
          reason?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          admin_notes: string | null
          agreed_date: string | null
          agreed_duration: string | null
          agreed_price: string | null
          alternative_date: string | null
          audience: string
          consent: boolean
          created_at: string
          email: string
          format: string
          goals: string
          id: string
          language: string
          name: string
          organization: string | null
          participants: number | null
          phone: string | null
          preferred_date: string
          preferred_time: string
          reference: string
          service_slug: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          agreed_date?: string | null
          agreed_duration?: string | null
          agreed_price?: string | null
          alternative_date?: string | null
          audience: string
          consent?: boolean
          created_at?: string
          email: string
          format: string
          goals: string
          id?: string
          language?: string
          name: string
          organization?: string | null
          participants?: number | null
          phone?: string | null
          preferred_date: string
          preferred_time: string
          reference: string
          service_slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          agreed_date?: string | null
          agreed_duration?: string | null
          agreed_price?: string | null
          alternative_date?: string | null
          audience?: string
          consent?: boolean
          created_at?: string
          email?: string
          format?: string
          goals?: string
          id?: string
          language?: string
          name?: string
          organization?: string | null
          participants?: number | null
          phone?: string | null
          preferred_date?: string
          preferred_time?: string
          reference?: string
          service_slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_service_slug_fkey"
            columns: ["service_slug"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["slug"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          handled: boolean
          id: string
          message: string
          name: string
          organization: string | null
        }
        Insert: {
          created_at?: string
          email: string
          handled?: boolean
          id?: string
          message: string
          name: string
          organization?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          handled?: boolean
          id?: string
          message?: string
          name?: string
          organization?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          duration_en: string | null
          duration_sv: string | null
          price_en: string | null
          price_sv: string | null
          slug: string
          sort: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          duration_en?: string | null
          duration_sv?: string | null
          price_en?: string | null
          price_sv?: string | null
          slug: string
          sort?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          duration_en?: string | null
          duration_sv?: string | null
          price_en?: string | null
          price_sv?: string | null
          slug?: string
          sort?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_exists: { Args: never; Returns: boolean }
      can_claim_admin: { Args: never; Returns: boolean }
      claim_first_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      submit_booking: {
        Args: {
          _alt_date: string
          _audience: string
          _consent: boolean
          _date: string
          _email: string
          _format: string
          _goals: string
          _language: string
          _name: string
          _organization: string
          _participants: number
          _phone: string
          _service: string
          _time: string
        }
        Returns: string
      }
      taken_dates: { Args: never; Returns: string[] }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
