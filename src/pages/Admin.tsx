import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Coffee, LogOut, Plus, Pencil, Trash2 } from "lucide-react";
import { z } from "zod";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
}

const blogPostSchema = z.object({
  title: z.string().min(1, "Judul harus diisi").max(200, "Judul terlalu panjang"),
  slug: z.string().min(1, "Slug harus diisi").max(200, "Slug terlalu panjang"),
  excerpt: z.string().max(500, "Ringkasan terlalu panjang").optional(),
  content: z.string().min(1, "Konten harus diisi").max(50000, "Konten terlalu panjang"),
  cover_image: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
});

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    published: false,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);

    // Check if user has admin or owner role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .in("role", ["admin", "owner"]);

    if (!roles || roles.length === 0) {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki akses admin",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    fetchPosts();
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal memuat artikel",
        variant: "destructive",
      });
      return;
    }

    setPosts(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      const validatedData = blogPostSchema.parse({
        ...formData,
        excerpt: formData.excerpt || undefined,
        cover_image: formData.cover_image || undefined,
      });

      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: validatedData.title,
            slug: validatedData.slug,
            excerpt: validatedData.excerpt || null,
            content: validatedData.content,
            cover_image: validatedData.cover_image || null,
            published: formData.published,
          })
          .eq("id", editingPost.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Artikel berhasil diperbarui",
        });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([{
            title: validatedData.title,
            slug: validatedData.slug,
            excerpt: validatedData.excerpt || null,
            content: validatedData.content,
            cover_image: validatedData.cover_image || null,
            published: formData.published,
            author_id: user.id,
          }]);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Artikel berhasil dibuat",
        });
      }

      resetForm();
      fetchPosts();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validasi Gagal",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      cover_image: post.cover_image || "",
      published: post.published,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus artikel",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Berhasil",
      description: "Artikel berhasil dihapus",
    });
    fetchPosts();
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "",
      published: false,
    });
  };

  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-latte">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {editingPost ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {editingPost ? "Edit Artikel" : "Buat Artikel Baru"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({
                        ...formData,
                        title,
                        slug: generateSlug(title),
                      });
                    }}
                    placeholder="Judul artikel"
                    maxLength={200}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="slug-artikel"
                    maxLength={200}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Ringkasan</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Ringkasan singkat artikel"
                    rows={3}
                    maxLength={500}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Konten</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Isi artikel lengkap"
                    rows={8}
                    maxLength={50000}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover_image">URL Gambar Cover</Label>
                  <Input
                    id="cover_image"
                    type="url"
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, published: checked })
                      }
                    />
                    <Label htmlFor="published">Publikasikan</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-coffee text-primary-foreground"
                  >
                    {editingPost ? "Perbarui" : "Buat"} Artikel
                  </Button>
                  {editingPost && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Semua Artikel</h2>
            {posts.map((post) => (
              <Card key={post.id} className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span
                          className={`px-2 py-1 rounded ${
                            post.published ? "bg-accent/20 text-accent" : "bg-muted"
                          }`}
                        >
                          {post.published ? "Dipublikasi" : "Draft"}
                        </span>
                        <span>{new Date(post.created_at).toLocaleDateString("id-ID")}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(post)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
