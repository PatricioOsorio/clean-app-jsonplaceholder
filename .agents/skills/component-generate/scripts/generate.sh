#!/usr/bin/env bash

# generate.sh
# Usage: bash ./generate.sh <TargetDir> <ComponentName> [--skeleton]

TARGET_DIR=$1
COMP_NAME=$2
SKELETON=$3

if [ -z "$COMP_NAME" ]; then
  echo "Usage: bash ./generate.sh <TargetDir> <ComponentName> [--skeleton]"
  exit 1
fi

FULL_PATH="$TARGET_DIR/$COMP_NAME"
mkdir -p "$FULL_PATH"

# Kebab-case container name
CONTAINER_NAME=$(echo "$COMP_NAME" | sed -r 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')-container

# Element prefix (first letter of each word in ComponentName in lowercase)
PREFIX=$(echo "$COMP_NAME" | sed -r 's/([A-Z])/ \1/g' | awk '{for(i=1;i<=NF;i++) printf "%s", tolower(substr($i,1,1))}'; echo "")
ELEMENT_PREFIX="${PREFIX}__"

# 1. interfaces.ts
cat <<EOF > "$FULL_PATH/$COMP_NAME.interfaces.ts"
import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';

export interface I${COMP_NAME}VM {
  // TODO: Agregar datos de dominio (View Model)
}

export interface I${COMP_NAME}Props extends IWithRootProps<'div'>, I${COMP_NAME}VM {
  status?: IWithLoading & IWithError & IWithEmpty;
}
EOF

# 2. css (Nesting & Tailwind v4)
cat <<EOF > "$FULL_PATH/$COMP_NAME.css"
@reference "@styles/app.css";

.$CONTAINER_NAME {
  @apply flex w-full flex-col;

  .${ELEMENT_PREFIX}title {
    @apply text-foreground font-semibold;
  }
}
EOF

# 3. tsx
cat <<EOF > "$FULL_PATH/$COMP_NAME.tsx"
import { cn } from 'lib-styleguide-simba/utils';
import { StatusContent, Empty, Error } from '@presentation/shared/components';
import type { I${COMP_NAME}Props } from './$COMP_NAME.interfaces';
import './$COMP_NAME.css';

export const $COMP_NAME = ({ rootProps, status = {} }: I${COMP_NAME}Props) => (
  <div {...rootProps} className={cn('$CONTAINER_NAME', rootProps?.className)}>
    <StatusContent 
      {...status}
      emptyTemplate={status.emptyTemplate ?? <Empty description="Sin datos." title="Vacío" />}
      errorTemplate={status.errorTemplate ?? <Error description={status.errorDescription} title={status.errorTitle} />}
    >
      <div className="${ELEMENT_PREFIX}title">Componente $COMP_NAME</div>
    </StatusContent>
  </div>
);
EOF

# 4. index.ts
if [ "$SKELETON" == "--skeleton" ]; then
  cat <<EOF > "$FULL_PATH/index.ts"
export * from './$COMP_NAME';
export * from './$COMP_NAME.interfaces';
export * from './Skeleton/Skeleton.interfaces';
EOF
else
  cat <<EOF > "$FULL_PATH/index.ts"
export * from './$COMP_NAME';
export * from './$COMP_NAME.interfaces';
EOF
fi

# 5. skeleton
if [ "$SKELETON" == "--skeleton" ]; then
  mkdir -p "$FULL_PATH/Skeleton"
  
  # Skeleton interfaces.ts
  cat <<EOF > "$FULL_PATH/Skeleton/Skeleton.interfaces.ts"
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface I${COMP_NAME}SkeletonProps extends IWithRootProps<'div'> {
  items?: number;
}
EOF

  # Skeleton.css
  SKELETON_CONTAINER="${CONTAINER_NAME/container/skeleton-container}"
  SKELETON_PREFIX="${PREFIX}sc__"
  
  cat <<EOF > "$FULL_PATH/Skeleton/Skeleton.css"
@reference "@styles/app.css";

.$SKELETON_CONTAINER {
  @apply flex flex-col gap-4;

  .${SKELETON_PREFIX}item {
    @apply border-border bg-card flex flex-col p-4 rounded-xl border;
  }
}
EOF

  # Skeleton.tsx
  cat <<EOF > "$FULL_PATH/Skeleton/Skeleton.tsx"
import { Skeleton } from '@presentation/shared/components';
import type { I${COMP_NAME}SkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const ${COMP_NAME}Skeleton = ({ items = 1, rootProps }: I${COMP_NAME}SkeletonProps) => (
  <div {...rootProps} className="$SKELETON_CONTAINER">
    {Array.from({ length: items }).map((_, i) => (
      <div key={\`skeleton-\${i}\`} className="${SKELETON_PREFIX}item">
        <Skeleton.Text className="h-6 w-3/4 mb-2" />
        <Skeleton.Text className="w-full" />
      </div>
    ))}
  </div>
);
EOF

  # Add Skeleton attachment in component file
  cat <<EOF >> "$FULL_PATH/$COMP_NAME.tsx"

// Integración del Skeleton estático
import { ${COMP_NAME}Skeleton } from './Skeleton/Skeleton';

${COMP_NAME}.Skeleton = ${COMP_NAME}Skeleton;
EOF

  # Update StatusContent placeholder in main file to point to static skeleton
  sed -i '' "s/\/\/ loadingTemplate/loadingTemplate/g" "$FULL_PATH/$COMP_NAME.tsx" 2>/dev/null || sed -i "s/\/\/ loadingTemplate/loadingTemplate/g" "$FULL_PATH/$COMP_NAME.tsx"
  sed -i '' "s/loadingTemplate={status.loadingTemplate}/loadingTemplate={status.loadingTemplate ?? <${COMP_NAME}.Skeleton items={3} \/>}/g" "$FULL_PATH/$COMP_NAME.tsx" 2>/dev/null || sed -i "s/loadingTemplate={status.loadingTemplate}/loadingTemplate={status.loadingTemplate ?? <${COMP_NAME}.Skeleton items={3} \/>}/g" "$FULL_PATH/$COMP_NAME.tsx"
fi

echo "Scaffold generado correctamente en $FULL_PATH."

