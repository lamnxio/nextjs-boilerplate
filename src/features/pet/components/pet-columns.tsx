"use client"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pet } from "@/services/apis/petstore-api.gen"
import { Translator } from "@/types/next-intl"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

interface GetPetColumnsProps {
  t: Translator
}

export const getPetColumns = ({ t }: GetPetColumnsProps): ColumnDef<Pet>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={t("PetTable.select_all")}
        />
      ),
      cell: ({ row }) => (
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label={t("PetTable.select_row")} />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("PetTable.columns.id")} />,
      cell: ({ row }) => {
        const id = row.getValue("id") as number
        return <div className="font-medium">{id}</div>
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("PetTable.columns.name")} />,
      cell: ({ row }) => {
        const name = row.getValue("name") as string
        return <div className="font-medium">{name}</div>
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("PetTable.columns.category")} />,
      cell: ({ row }) => {
        const category = row.getValue("category") as Pet["category"]
        return <div>{category?.name ? <Badge variant="outline">{category.name}</Badge> : <span className="text-muted-foreground">-</span>}</div>
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("PetTable.columns.status")} />,
      cell: ({ row }) => {
        const status = row.getValue("status") as Pet["status"]

        const getStatusVariant = (status: Pet["status"]) => {
          switch (status) {
            case "available":
              return "default"
            case "pending":
              return "secondary"
            case "sold":
              return "destructive"
            default:
              return "outline"
          }
        }

        const getStatusText = (status: Pet["status"]) => {
          switch (status) {
            case "available":
              return t("PetTable.status.available")
            case "pending":
              return t("PetTable.status.pending")
            case "sold":
              return t("PetTable.status.sold")
            default:
              return t("PetTable.status.unknown")
          }
        }

        return <Badge variant={getStatusVariant(status)}>{getStatusText(status)}</Badge>
      },
    },
    {
      accessorKey: "tags",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("PetTable.columns.tags")} />,
      cell: ({ row }) => {
        const tags = row.getValue("tags") as Pet["tags"]
        return (
          <div className="flex flex-wrap gap-1">
            {tags && tags.length > 0 ? (
              tags.slice(0, 2).map((tag, index) => (
                <Badge key={tag.id || index} variant="outline" className="text-xs">
                  {tag.name}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
            {tags && tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "photoUrls",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("PetTable.columns.photos")} />,
      cell: ({ row }) => {
        const photoUrls = row.getValue("photoUrls") as string[]
        return <div className="text-muted-foreground text-sm">{t("PetTable.photo_count", { count: photoUrls?.length || 0 })}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const pet = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("PetTable.actions.open_menu")}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("PetTable.actions.actions")}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(pet.id?.toString() || "")}>{t("PetTable.actions.copy_pet_id")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("PetTable.actions.view_details")}</DropdownMenuItem>
              <DropdownMenuItem>{t("PetTable.actions.edit_pet")}</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">{t("PetTable.actions.delete_pet")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
