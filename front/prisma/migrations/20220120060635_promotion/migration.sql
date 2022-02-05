-- CreateTable
CREATE TABLE "Promotion" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "Descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);
