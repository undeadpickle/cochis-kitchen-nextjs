// src/components/common/CategoryDropdown.tsx
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import * as SelectPrimitive from "@radix-ui/react-select";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// Define the CategoryDropdown props interface
export interface Category {
    id: string;
    name: string;
    icon: React.ElementType;
}

interface CategoryDropdownProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
    className?: string;
}

// Custom SelectItem without the checkmark
const CustomSelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
        isActive?: boolean;
        icon?: React.ElementType;
    }
>(({ className, children, isActive, icon: Icon, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-pointer select-none items-center rounded-sm py-3 px-4",
            isActive
                ? "bg-cochi-red text-white font-medium"
                : "text-cochi-brown hover:bg-cochi-cream-darker/30",
            className
        )}
        {...props}
    >
        {Icon && (
            <div className="flex items-center gap-2.5">
                <Icon size={16} className={isActive ? "text-white" : "text-cochi-red"} />
                <span>{children}</span>
            </div>
        )}
        {!Icon && children}
    </SelectPrimitive.Item>
));
CustomSelectItem.displayName = "CustomSelectItem";

/**
 * A reusable dropdown component for selecting categories
 * with icons and styled according to the application theme
 */
const CategoryDropdown = ({
    categories,
    activeCategory,
    onCategoryChange,
    className
}: CategoryDropdownProps) => {
    const selectedCategory = categories.find(cat => cat.id === activeCategory) || categories[0];

    // Use effect to inject styles to hide the default arrow
    useEffect(() => {
        const styleId = 'category-dropdown-styles';

        // Only add if it doesn't exist
        if (!document.getElementById(styleId)) {
            const styleEl = document.createElement('style');
            styleEl.id = styleId;
            styleEl.innerHTML = `
                [data-radix-select-trigger] [data-icon] {
                    display: none !important;
                }
            `;
            document.head.appendChild(styleEl);
        }

        // No need to remove the style as it should persist for all instances
    }, []);

    return (
        <div className={cn("w-full", className)}>
            <Select
                defaultValue={activeCategory}
                onValueChange={onCategoryChange}
            >
                <SelectTrigger
                    className="w-full bg-white border border-cochi-cream-darker/50 shadow-sm rounded-md relative"
                    aria-label={`Select category, currently ${selectedCategory.name}`}
                >
                    <div className="flex items-center gap-2">
                        {React.createElement(selectedCategory.icon, { size: 18, className: "text-cochi-red" })}
                        <SelectValue placeholder={selectedCategory.name} className="font-medium text-cochi-brown">
                            {selectedCategory.name}
                        </SelectValue>
                    </div>
                    {/* Custom chevron that replaces the default one */}
                    <ChevronDown className="h-4 w-4 text-cochi-red absolute right-3 pointer-events-none" />
                </SelectTrigger>
                <SelectContent
                    className="bg-white border border-cochi-cream-darker/50 rounded-md shadow-md w-[var(--radix-select-trigger-width)]"
                    position="popper"
                    sideOffset={4}
                >
                    {categories.map((category) => (
                        <CustomSelectItem
                            key={category.id}
                            value={category.id}
                            isActive={category.id === activeCategory}
                            icon={category.icon}
                        >
                            {category.name}
                        </CustomSelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default CategoryDropdown; 